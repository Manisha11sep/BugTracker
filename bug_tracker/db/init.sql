create table users( 
id serial primary key,
username varchar,
password varchar,
email varchar,
profile_pic text
);

create table issue(
id serial PRIMARY KEY,
name varchar,
description varchar,
creater_id INTEGER references users(id),
last_updated varchar
);

create table comment(
id serial PRIMARY KEY,
description varchar,
issue_id INTEGER references issue(id),
posted_by varchar
);

create table issue_status(
id serial PRIMARY KEY,
issue_status BOOLEAN,
issue_id INTEGER references issue(id)
);