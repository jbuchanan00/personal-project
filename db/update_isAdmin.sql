update user_personal_info
set isadmin = ${assigningIsAdmin}
where user_info_id in (
    select user_info.id from user_info
    join secret_info 
    on user_info.first_name = secret_info.first_name and user_info.last_name = secret_info.last_name
    where ssn = ${ssn}
);
