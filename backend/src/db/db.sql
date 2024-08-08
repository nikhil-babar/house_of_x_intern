use LinkShortner;


drop table URL;


drop table User;


create table User (id varchar(255) primary key,
                                           name varchar(255),
                                                email varchar(255),
                                                      created_at timestamp,
                                                                 updated_at timestamp);


create table URL (id varchar(255) primary key, name varchar(255), category varchar(255), user_id varchar(255), url varchar(255), redirect_url varchar(255), user_count bigint, created_at timestamp, updated_at timestamp,
                  foreign key (user_id) references User(id));

