alter table "public"."scores" drop constraint "scores_account_fkey";

alter table "public"."scores" drop constraint "scores_pkey";

drop index if exists "public"."scores_pkey";

drop table "public"."scores";

alter table "public"."communities" disable row level security;


