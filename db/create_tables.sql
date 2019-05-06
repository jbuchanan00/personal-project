create table user_info(
    id serial primary key,
    first_name varchar(40),
    last_name varchar (40),
    email varchar(40),
    phone_number varchar(10)
);
create table user_personal_info(
    id serial primary key,
    street varchar,
    city varchar,
    state varchar(2),
    zip varchar(10),
    isAdmin boolean
    user_info_id integer,
    user_info_id foreign key references user_info
);
create table user_account(
    id serial primary key,
    account_number varchar(8),
    savings_balance integer,
    checkings_balance integer,
    auto_loan_balance integer,
    personal_loan_balance integer,
    credit_card_balance integer
);
create table secret_info(
    id serial primary key,
    first_name varchar(40),
    last_name varchar(40),
    ssn varchar(11),
    account_number varchar(8),
    birthday varchar(10)
);
create table user_employment(
    id serial primary key,
    user_info_id integer,
    employer varchar(80),
    title varchar,
    income integer,
    user_info_id foreign key references user_info
);
create table user_auth(
    id serial primary key,
    username varchar(25),
    password text,
    email varchar(40)
)
