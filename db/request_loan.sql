insert into user_employment(
    employer,
    title,
    income,
    user_info_id,
    loan_number
)values(
    ${employer},
    ${work_title},
    ${income},
    (select id from user_info
    where username = ${username}),
    ${loan_number}
);
insert into loan_request(
    loan_number,
    loan_amount,
    term_length,
    loan_type
)values(
    ${loan_number},
    ${loan_amount},
    ${term_length},
    ${loan_type}
);
select * from loan_request