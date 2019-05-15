update user_account
set credit_card_balance = ${credit_card_balance}
where account_number = ${account_number};
select first_name, last_name, ua.account_number, savings_balance, checkings_balance, auto_loan_balance,
personal_loan_balance, credit_card_balance from user_account ua
join secret_info si
on ua.account_number = si.account_number
where ua.account_number = ${account_number}