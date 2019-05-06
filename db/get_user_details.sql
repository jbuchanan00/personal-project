select * from user_info ui
join user_personal_info upi
on ui.id = upi.user_info_id
where email=${email}