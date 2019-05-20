select * from user_info ui
join user_employment ue
on ui.id = ue.user_info_id
join loan_request lr
on lr.loan_number = ue.loan_number
where lr.loan_number = ${loan_number}