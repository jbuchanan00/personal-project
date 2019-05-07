select savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance, ua.account_number, si.first_name, si.last_name
from user_account ua
join secret_info si
on ua.account_number = si.account_number
where si.account_number = ${account_number} 