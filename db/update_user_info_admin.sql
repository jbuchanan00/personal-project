update user_info
set email = ${email}, phone_number = ${phone_number}, first_name = ${first_name}, last_name = ${last_name}
where username = ${username};
update user_personal_info
set street = ${street}, city = ${city}, zip = ${zip}, _state = ${_state}, isadmin = ${isadmin}
where user_info_id = (select id from user_info where username = ${username})
