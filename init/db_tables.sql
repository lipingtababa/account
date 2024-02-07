CREATE TABLE accounts (
  account_id VARCHAR(255) PRIMARY KEY,
  account_name VARCHAR(255),
  total_spend DECIMAL(10, 2),
  remaining_spend DECIMAL(10, 2)
);

CREATE TABLE transactions (
  transaction_id VARCHAR(255) PRIMARY KEY,
  account_id VARCHAR(255),
  amount DECIMAL(10, 2),
  date TIMESTAMP
);

CREATE TABLE cards (
  card_id VARCHAR(255) PRIMARY KEY,
  account_id VARCHAR(255),
  image_uri VARCHAR(255)
);

CREATE TABLE invoices (
  invoice_id VARCHAR(255) PRIMARY KEY,
  account_id VARCHAR(255),
  amount DECIMAL(10, 2),
  due_date TIMESTAMP
);
