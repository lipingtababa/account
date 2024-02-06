export interface AccountOverview {
    account_id: string;                     // The account ID, not the user ID
    account_name: string;                   // The name of the account
    total_spend: number;                    // The upper limit of the account
    remaining_spend: number;                // The remaining amount of the account
    cards: Card[];                          // The cards associated with this account
    transactions: TransactionsCollection;   // The last N transactions for this account
    invoices: Invoice[];                    // The invoices for this account
}

export interface AccountDetail {
    account_id: string;
    account_name: string;
    total_spend: number;
    remaining_spend: number;
}

export interface TransactionsCollection {
    total_num_of_transactions: number;  // The total number of transactions for this account
    transactions: Transaction[];        // The last N transactions for this account
}

export interface Transaction {
    transaction_id: number;
    account_id: number;
    amount: number;
    date: string;
}

export interface Card {
    card_id: string;
    account_id: number;
    image_uri: string;
}

export interface Invoice {
    invoice_id: number;
    account_id: number;
    amount: number;
    due_date: string;
}

