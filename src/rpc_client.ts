import { Card, Invoice, TransactionsCollection } from "./interfaces.js";
import Axios, { AxiosInstance } from 'axios';
import { logger } from './utils.js';

export class RpcClient {
    cardsClient: AxiosInstance;
    transactionsClient: AxiosInstance;
    invoicesClient: AxiosInstance;

    constructor() {
        this.cardsClient = Axios.create({
            baseURL: 'http://cards:8080',
            timeout: 1000,
        });

        this.transactionsClient = Axios.create({
            baseURL: 'http://transactions:8080',
            timeout: 1000,
        });

        this.invoicesClient = Axios.create({
            baseURL: 'http://invoices:8080',
            timeout: 1000,
        });
    }

    async getCardsByAccountId(accountId: string): Promise<Card[]> {
        try {
            const response = await this.cardsClient.get(`/card/byaccountid/${accountId}`);
            return response.data;
        } catch (error) {
            logger.debug(`Failed to get cards: ${error}`);
            throw error;
        }
    }

    async getTransactionHistory(accountId: string, limit: number): Promise<TransactionsCollection> {
        try {
            const response = await this.transactionsClient.get(`/transactions/${accountId}?limit=${limit}`);
            return response.data;
        } catch (error) {
            logger.debug(`Failed to get transaction history: ${error}`);
            throw error;
        }
    }

    async getInvoices(accountId: string): Promise<Invoice[]> {
        try {
            const response = await this.invoicesClient.get(`/invoices/${accountId}`);
            return response.data;
        } catch (error) {
            logger.debug(`Failed to get invoices: ${error}`);
            throw error;
        }
    }
}
