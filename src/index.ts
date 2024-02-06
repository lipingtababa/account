import express, { Request, Response } from 'express';
import { DBService } from './dbservice.js';
import { NoAccountException } from './exceptions.js';
import { logger } from './utils.js';
import { Invoice, Card, TransactionsCollection, AccountOverview } from './interfaces.js';
import { RpcClient } from './rpc_client.js';
import { presignCardImage } from './card.js';
import { MAX_NUM_OF_TRANSACTIONS } from './constants.js';
import AWS from 'aws-sdk';

const PORT = 80;
const HEALTHCHECK_PORT = 81;

AWS.config.update({region: process.env.AWS_REGION});

export const businessRouter = express();
businessRouter.use(express.json());

businessRouter.get('/account/overview/:accountid', async (req: Request, res: Response) => {
    const accountId = req.params.accountid;

    const dbService = new DBService();
    const rpcClient = new RpcClient();

    try {
        const accountDetail = await dbService.getAccountDetail(accountId);

        const cards: Card[] = await rpcClient.getCardsByAccountId(accountId);
        const transactions: TransactionsCollection = await rpcClient.getTransactionHistory(accountId, MAX_NUM_OF_TRANSACTIONS);
        const invoices: Invoice[] = await rpcClient.getInvoices(accountId);
    
        const accountOverview: AccountOverview = {
            ...accountDetail,
            cards,
            transactions,
            invoices
        };

        res.json({
            status: "success",
            data: accountOverview
        });
    }
    catch (error) {
        if (error instanceof NoAccountException) {
            logger.info(`Account ${accountId} not found.`);
            res.status(404).json({
                status: "error",
                message: error.message
            });
            return;
        }

        logger.error(`Failed to get account overview: ${error}`);
        res.status(500).json({
            status: "error",
            message: "Failed to get account overview."
        });
    }
});

businessRouter.post('/card/activate', (req: Request, res: Response) => {
    const { card_id, account_id } = req.body;
    // TODO Validate input

    // TODO Send request to some MQ

    res.json({
        status: "success",
        message: `Request of activation of Card ${card_id} for customer ${account_id} accepted.`
    });
});

businessRouter.post('/customer/contact', (req: Request, res: Response) => {
    // accept a form of contact and a message
    const { contact, message } = req.body;
    //TODO validate input

    //TODO save to DB or send to MQ

    res.json({
        status: "success",
        message: `Request to contact customer at ${contact} with message ${message} accepted.`
    });
});

businessRouter.get('/card/byaccountid/:accountid', async (req: Request, res: Response) => {
    const accountid = req.params.accountid;
    const dbClient = new DBService();
    const cards = await dbClient.getCardsByAccountId(accountid);

    // Image URI is path, which should be presigned before sending to client
    cards.map((card) => {
        card.image_uri = presignCardImage(card.image_uri);
    });

    res.json({
        status: "success",
        data: cards
    });
});

businessRouter.get('/invoice/byaccountid/:accountid', async (req: Request, res: Response) => {
    const accountid = req.params.accountid;
    const dbClient = new DBService();
    const invoices = await dbClient.getInvoices(accountid);

    res.json({
        status: "success",
        data: invoices
    });
});

businessRouter.get('/transactions/byaccountid/:accountid', async (req: Request, res: Response) => {
    const accountid = req.params.accountid;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : MAX_NUM_OF_TRANSACTIONS;
    const dbClient = new DBService();

    try {
        const transactionCollection = await dbClient.getTransactionHistory(accountid, limit);
        res.json({
            status: "success",
            data: transactionCollection
        });
    }
    catch (error) {
        logger.error(`Failed to get transactions: ${error}`);
        res.status(500).json({
            status: "error",
            message: "Failed to get transactions."
        });
    }
});

const healthcheckFunction =  (req: Request, res: Response) => {
    res.json({
        status: "success",
        message: `Server ${process.env.APP_NAME}:${process.env.APP_VERSION} running in ${process.env.AWS_REGION}.`
    });
}
businessRouter.get('/ping', healthcheckFunction);

businessRouter.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Also listens on 81 for heachcheck
const healthcheckRouter = express();
healthcheckRouter.use(express.json());

healthcheckRouter.get('/ping', healthcheckFunction);

healthcheckRouter.listen(HEALTHCHECK_PORT, () => {
    console.log(`Health check server is running on http://localhost:${HEALTHCHECK_PORT}`);
});
