import process from 'process';
import { AccountOverview, Card, Invoice, Transaction } from './interfaces';
import Pool from 'pg';

export class DBService {
  private pool: Pool.Pool;

  constructor() {
    this.pool = new Pool.Pool({
      user: process.env.APP_NAME || 'qred',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.APP_NAME || 'qred',
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    });
  }

  async getAccountOverview(accountId: string): Promise<AccountOverview> {
    const query = `SELECT account_id, account_name, total_spend, remaining_spend FROM accounts WHERE account_id = $1`;
    const values = [accountId];
    try {
      const res = await this.pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error(`Failed to get account overview: ${error}`);
    }
  }

  async getTransactionHistory(accountId: string, limit: number): Promise<Transaction[]> {
    const query = `SELECT transaction_id, receiving_account_id, sending_account_id, amount, date FROM transactions WHERE sending_account_id = $1 OR receiving_account_id = $1 limit $2`;
    const values = [accountId, limit];
    try {
      const res = await this.pool.query(query, values);
      return res.rows;
    } catch (error) {
      throw new Error(`Failed to get transaction history: ${error}`);
    }
  }

  async getCards(accountId: string): Promise<Card[]> {
    const query = `SELECT card_id, account_id, image_arn FROM cards WHERE account_id = $1`;
    const values = [accountId];
    try {
      const res = await this.pool.query(query, values);
      return res.rows;
    } catch (error) {
      throw new Error(`Failed to get cards: ${error}`);
    }
  }

  async getInvoices(accountId: string): Promise<Invoice[]> {
    const query = `SELECT invoice_id, receiving_account_id, sending_account_id, amount, issue_date, due_date FROM invoices WHERE receiving_account_id = $1 OR sending_account_id = $1`;
    const values = [accountId];
    try {
      const res = await this.pool.query(query, values);
      return res.rows;
    } catch (error) {
      throw new Error(`Failed to get invoices: ${error}`);
    }
  }
}

