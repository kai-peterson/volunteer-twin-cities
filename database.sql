
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "full_name" VARCHAR (100) NOT NULL,
    "profile_pic" VARCHAR (500) DEFAULT 'images/profpic.jpg'
);

CREATE TABLE "orgs" (
  "id" SERIAL PRIMARY KEY,
  "admin_id" int REFERENCES "user",
  "name" varchar,
  "type" varchar,
  "intro" varchar,
  "image" varchar,
  "mission" varchar,
  "message" varchar,
  "address" varchar
);

CREATE TABLE "events" (
  "id" SERIAL PRIMARY KEY,
  "org_id" int REFERENCES "orgs",
  "event_name" varchar,
  "event_description" varchar,
  "event_start" varchar,
  "event_end" varchar,
  "reqs" varchar
);

CREATE TABLE "org_images" (
  "id" SERIAL PRIMARY KEY,
  "org_id" int REFERENCES "orgs",
  "image" varchar
);

CREATE TABLE "org_social" (
  "id" SERIAL PRIMARY KEY,
  "org_id" int REFERENCES "orgs",
  "user_id" int REFERENCES "user",
  "post_image" varchar,
  "post_text" varchar
);

CREATE TABLE "org_testimonials" (
  "id" SERIAL PRIMARY KEY,
  "org_id" int REFERENCES "orgs",
  "user_id" int REFERENCES "user",
  "post_description" varchar,
  "user_image" varchar
);

CREATE TABLE "users_events" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int REFERENCES "user",
  "event_id" int REFERENCES "events"
);
