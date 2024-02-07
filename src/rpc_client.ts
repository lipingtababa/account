import { Card, Invoice, TransactionsCollection } from "./interfaces.js";
import Axios, { AxiosInstance } from 'axios';
import { logger } from './utils.js';

export class RpcClient {
    accountClient: AxiosInstance;
    cardsClient: AxiosInstance;
    transactionsClient: AxiosInstance;
    invoicesClient: AxiosInstance;
    customerClient: AxiosInstance;

    constructor() {
        this.accountClient = Axios.create({
            baseURL: 'http://account.qred:80',
            timeout: 1000,
        });

        this.transactionsClient = Axios.create({
            baseURL: 'http://transaction.qred:80',
            timeout: 1000,
        });

        this.cardsClient = Axios.create({
            baseURL: 'http://card.qred:80',
            timeout: 1000,
        });

        this.invoicesClient = Axios.create({
            baseURL: 'http://invoice.qred:80',
            timeout: 1000,
        });

        this.customerClient = Axios.create({
            baseURL: 'http://customer.qred:80',
            timeout: 1000,
        });
    }

    async getCardsByAccountId(accountId: string): Promise<Card[]> {
        try {
            const response = await this.cardsClient.get(`/card/${accountId}`);
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
