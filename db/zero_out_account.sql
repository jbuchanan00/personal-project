update user_account
set savings_balance = 0
where account_number = ${account_number};
update user_account
set checkings_balance = 0
where account_number = ${account_number};
update user_account
set auto_loan_balance = 0
where account_number = ${account_number};
update user_account
set personal_loan_balance = 0
where account_number = ${account_number};
update user_account
set credit_card_balance = 0
where account_number = ${account_number};
