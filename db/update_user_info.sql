update user_info
set email = ${email}, phone_number = ${phone_number}
where username = ${username};
update user_personal_info
set street = ${street}, city = ${city}, zip = ${zip}, state = ${state}
where user_info_id = (select id from user_info where username = ${username})