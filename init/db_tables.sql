CREATE TABLE accounts (
  account_id VARCHAR(255) PRIMARY KEY,
  account_name VARCHAR(255),
  total_spend DECIMAL(10, 2),
  remaining_spend DECIMAL(10, 2)
)

CREATE TABLE transactions (
  transaction_id VARCHAR(255) PRIMARY KEY,
  receiving_account_id VARCHAR(255),
  sending_account_id VARCHAR(255),
  amount DECIMAL(10, 2),
  date TIMESTAMP,
  FOREIGN KEY (receiving_account_id) REFERENCES accounts(account_id),
  FOREIGN KEY (sending_account_id) REFERENCES accounts(account_id)
);

CREATE TABLE cards (
  card_id VARCHAR(255) PRIMARY KEY,
  account_id VARCHAR(255),
  image_arn VARCHAR(255),
  FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE invoices (
  invoice_id VARCHAR(255) PRIMARY KEY,
  receiving_account_id VARCHAR(255),
  sending_account_id VARCHAR(255),
  amount DECIMAL(10, 2),
  issue_date TIMESTAMP,
  due_date TIMESTAMP,
  FOREIGN KEY (receiving_account_id) REFERENCES accounts(account_id),
  FOREIGN KEY (sending_account_id) REFERENCES accounts(account_id)
);