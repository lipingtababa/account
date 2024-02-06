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
DO $$
DECLARE
  i INT;
  random_sending_account_id VARCHAR(255);
  random_receiving_account_id VARCHAR(255);
  random_amount DECIMAL(10,2);
  random_date TIMESTAMP;
BEGIN
  FOR i IN 1..1000 LOOP
    -- Randomly select a sending_account_id
    SELECT account_id INTO random_sending_account_id FROM accounts ORDER BY random() LIMIT 1;
    -- Randomly select a receiving_account_id, ensuring it's different
    LOOP
      SELECT account_id INTO random_receiving_account_id FROM accounts ORDER BY random() LIMIT 1;
      EXIT WHEN random_sending_account_id != random_receiving_account_id;
    END LOOP;
    -- Generate a random amount and date
    random_amount := ROUND((random() * (1000-10) + 10)::numeric, 2); -- Random amount between 10 and 1000
    random_date := NOW() - (ROUND(random() * 30) || ' days')::interval; -- Random date within the last 30 days
    -- Insert the transaction
    INSERT INTO transactions (transaction_id, sending_account_id, receiving_account_id, amount, date)
    VALUES ('txn' || i, random_sending_account_id, random_receiving_account_id, random_amount, random_date);
  END LOOP;
END$$;
