insert into user_info(
    first_name,
    last_name, 
    email,
    phone_number,
    username
) values(
    ${first_name},
    ${last_name},
    ${email},
    ${phone_number},
    ${username}
);
insert into user_personal_info(
    street,
    city,
    zip,
    isAdmin,
    state,
    user_info_id
)values(
    ${street},
    ${city},
    ${zip},
    false,
    ${state},
    (select id from user_info where username = ${username})
);
insert into secret_info(
    ssn,
    birthday,
    account_number,
    first_name,
    last_name
)values(
    ${ssn},
    ${birthday},
    ${account_number},
    ${first_name},
    ${last_name}
);
insert into user_account(
    account_number,
    savings_balance,
    checkings_balance,
    auto_loan_balance,
    personal_loan_balance,
    credit_card_balance
)values(
    ${account_number},
    0,
    0,
    0,
    0,
    0
);
insert into user_auth(
    username,
    password,
    email
)values(
    ${username},
    ${hash},
    ${email}
);
select * from user_info ui
join user_personal_info upi
on ui.id = upi.user_info_id
join secret_info si
on si.first_name = ui.first_name and si.last_name = ui.last_name
where email=${email}
