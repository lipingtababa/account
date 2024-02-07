-- Add random data to the accounts table
INSERT INTO accounts (account_id, account_name, total_spend, remaining_spend) VALUES
('acc1', 'Global Tech Solutions', 1000.00, 800.00),
('acc2', 'Innovative Systems Corp', 2000.00, 1750.00),
('acc3', 'Enterprise Networking LLC', 1500.00, 1200.00),
('acc4', 'Dynamic Software Ltd', 1800.00, 1500.00),
('acc5', 'NextGen Communications', 2200.00, 2000.00),
('acc6', 'EcoFriendly Energies Inc', 1200.00, 1100.00),
('acc7', 'Advanced Analytics Group', 1300.00, 1250.00),
('acc8', 'Blockchain Innovations Co', 1400.00, 1300.00),
('acc9', 'Cloud Computing Services', 1600.00, 1500.00),
('acc10', 'AI Research Labs', 1700.00, 1650.00);

-- Add random data to the transactions table
INSERT INTO transactions (transaction_id, account_id, date, amount) VALUES
('trans1', 'acc1', '2020-01-01', 100.00),
('trans2', 'acc1', '2020-01-02', 200.00),
('trans3', 'acc1', '2020-01-03', 300.00),
('trans4', 'acc1', '2020-01-04', 400.00),
('trans5', 'acc1', '2020-01-05', 500.00);
