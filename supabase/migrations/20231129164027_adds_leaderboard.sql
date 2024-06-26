create table "public"."leaderboard" (
    "id" bigint generated by default as identity not null,
    "user" uuid not null,
    "score" bigint not null
);


alter table "public"."leaderboard" enable row level security;

CREATE UNIQUE INDEX leaderboard_pkey ON public.leaderboard USING btree (id);

CREATE UNIQUE INDEX leaderboard_user_key ON public.leaderboard USING btree ("user");

alter table "public"."leaderboard" add constraint "leaderboard_pkey" PRIMARY KEY using index "leaderboard_pkey";

alter table "public"."leaderboard" add constraint "leaderboard_user_fkey" FOREIGN KEY ("user") REFERENCES accounts(user_id) not valid;

alter table "public"."leaderboard" validate constraint "leaderboard_user_fkey";

alter table "public"."leaderboard" add constraint "leaderboard_user_key" UNIQUE using index "leaderboard_user_key";


