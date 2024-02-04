import express, { Request, Response } from 'express';
import path from 'path';
import AWS from 'aws-sdk';
import {DBService} from './DBService';

const PORT = 80;

const app = express();
app.use(express.json());

app.get('/account/overview/:accountid', async (req: Request, res: Response) => {
    const accountId = req.params.accountid;

    var accountOverview: any = {};

    const dbService = new DBService();
    const s3 = new AWS.S3();
    try {
        accountOverview = await dbService.getAccountOverview(accountId);
    
        const cardImageARN = accountOverview['cardImageARN']
        // Generate a presigned URL for this image
        const signedUrl = s3.getSignedUrl('getObject', {
            Bucket: 'bucket-name',
            Key: cardImageARN,
            Expires: 60 * 5 // 5 minutes
        });

        accountOverview['cardImageURL'] = signedUrl;

        const transactionHistory = await dbService.getTransactionHistory(accountId, 10);
        accountOverview['transactionHistory'] = transactionHistory;
    } catch (error) {
        console.error(error);
    }
    
    res.json({
        status: "success",
        data: accountOverview
    });
});

app.use('/customer-service/contact', express.static(path.join(__dirname, 'public')));

app.post('/card/activate', (req: Request, res: Response) => {
    const { cardNumber, customerId } = req.body;
    res.json({
        status: "success",
        message: `Card ${cardNumber} for customer ${customerId} activated.`
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Also listens on 8081 for heachcheck
const healthcheckApp = express();
healthcheckApp.use(express.json());

healthcheckApp.get('/ping', (req: Request, res: Response) => {
    res.json({
        status: "success",
        message: "Server is running."
    });
});

healthcheckApp.listen(81, () => {
    console.log(`Health check server is running on http://localhost:8081`);
});
