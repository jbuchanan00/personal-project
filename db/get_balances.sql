select savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance, ua.account_number, ui.first_name, ui.last_name
from user_account ua
join secret_info si
on ua.account_number = si.account_number
join user_info ui
on ua.id = ui.id
where si.account_number = ${account_number} 