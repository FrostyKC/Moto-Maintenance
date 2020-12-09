
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

create table vehicles (
  id SERIAL PRIMARY KEY,
  name varchar (80) NOT NULL,
  image varchar,
  user_id int references "user"
);

create table oil (
  id SERIAL PRIMARY KEY,
  active boolean,
  date date,
  miles_drove int,
  miles_allowed int,
  miles_left int,
  vehicle_id int references vehicles
);

create table tires (
	id SERIAL PRIMARY KEY,
  active boolean,
  date date,
  miles_drove int,
  miles_allowed int,
  miles_left int,
  vehicle_id int references vehicles
);

create table trips (
id SERIAL PRIMARY KEY,
  name varchar (80),
  start_point varchar (240),
  end_point varchar (240),
  date date,
  roundtrip boolean,
  total int,
  vehicle_id int references vehicles
);

create table locations (
id SERIAL PRIMARY KEY,
  name varchar (80),
  address varchar (240),
  latitude float,
  longitude float,
  image varchar (240),
  user_id int references "user"
);
