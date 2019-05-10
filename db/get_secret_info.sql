
select savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance, ua.account_number, si.first_name, si.last_name,
si.ssn, si.birthday, ui.email
from secret_info si
join user_account ua
on ua.account_number = si.account_number
join user_info ui 
on ui.first_name = si.first_name and ui.last_name = si.last_name
where si.account_number = ${account_number} 