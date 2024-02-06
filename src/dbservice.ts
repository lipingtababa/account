import process from 'process';
import { AccountDetail, Card, Invoice, TransactionsCollection } from './interfaces.js';
import Pool from 'pg';
import { NoAccountException } from './exceptions.js';
import { assert } from 'console';
import { logger } from './utils.js';

export class DBService {
  private pool: Pool.Pool;

  constructor() {
    this.pool = new Pool.Pool({
      user: process.env.APP_NAME,
      host: process.env.DB_HOST,
      database: process.env.APP_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  async getAccountDetail(accountId: string): Promise<AccountDetail> {
    const query = `SELECT account_id, account_name, total_spend, remaining_spend FROM accounts WHERE account_id = $1`;
    const values = [accountId];

    let res;
    try {
      res = await this.pool.query(query, values);
    } catch (error) {
      logger.info(`Failed to get account overview from db: ${error}`);
      throw error;
    }

    if (res.rows.length === 0) {
      throw new NoAccountException(`Account ${accountId} not found.`)
    }

    // accountID is the primary key, so we should only get 1 row
    assert(res.rows.length === 1, `Expected 1 row, got ${res.rows.length}`);
    return res.rows[0];
  }

  async getTransactionHistory(accountId: string, limit: number): Promise<TransactionsCollection> {
    const listQuery = `SELECT transaction_id, account_id, amount, date FROM transactions WHERE account_id = $1 limit $2`;
    const listValues = [accountId, limit];

    const numQuery = `SELECT count(*) FROM transactions WHERE account_id = $1`;
    const numValues = [accountId];

    try {
      const trans =  await this.pool.query(listQuery, listValues);
      const num = await this.pool.query(numQuery, numValues);
      
      return {
        total_num_of_transactions: parseInt(num.rows[0].count),
        transactions: trans.rows
      };
    } catch (error) {
      logger.debug(`Failed to get transaction history from db: ${error}`);
      throw error;
    }
  }

  async getCardsByAccountId(accountId: string): Promise<Card[]> {
    const query = `SELECT card_id, account_id, image_uri FROM cards WHERE account_id = $1`;
    const values = [accountId];
    try {
      const res = await this.pool.query(query, values);
      return res.rows;
    } catch (error) {
      logger.debug(`Failed to get cards from db: ${error}`);
      throw error;
    }
  }

  async getInvoices(accountId: string): Promise<Invoice[]> {
    const query = `SELECT invoice_id, account_id, amount, due_date FROM invoices WHERE account_id = $1`;
    const values = [accountId];
    try {
      const res = await this.pool.query(query, values);
      return res.rows;
    } catch (error) {
      logger.debug(`Failed to get invoices from db: ${error}`);
      throw error;
    }
  }
}

