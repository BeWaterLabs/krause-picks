alter table "public"."accounts" alter column "profile_picture_url" set default ''::text;

alter table "public"."accounts" alter column "profile_picture_url" set not null;


