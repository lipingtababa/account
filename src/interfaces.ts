export interface Card {
    cardId: string;
    accountId: number;
    imageARN: string;
}

export interface Transaction {
    transactionId: number;
    reveivingAccountId: number;
    sendingAccountId: number;
    amount: number;
    date: string;
}

export interface Invoice {
    invoiceId: number;
    receivingAccountId: number;
    sendingAccountId: number;
    amount: number;
    issueDate: string;
    dueDate: string;
}

export interface AccountOverview {
    id: number;
    name: string;
    totalSpend: number;
    remainingSpend: number;
    cards: Card[];
    transactionHistory: Transaction[];
    invoices: Invoice[];
}
