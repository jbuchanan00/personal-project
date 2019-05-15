select ui.first_name, ui.last_name, ui.email, ui.phone_number, upi.street, upi.city, upi.zip, upi.isadmin, upi.state, ui.username from user_info ui
join user_personal_info upi
on ui.id = upi.user_info_id
join secret_info si
on si.first_name = ui.first_name and si.last_name = ui.last_name
where account_number = ${account_number};