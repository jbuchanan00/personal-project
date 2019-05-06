select * from user_info ui
join user_personal_info upi
on ui.id = upi.user_info_id
join secret_info si
on si.first_name = ui.first_name and si.last_name = ui.last_name
join user_auth ua
on ua.username = ui.username
where ui.email=${email}