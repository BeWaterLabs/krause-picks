create table "public"."picks" (
    "id" bigint generated by default as identity not null,
    "account" uuid not null,
    "game" bigint not null,
    "content" json,
    "pick" json not null,
    "created_at" timestamp with time zone not null default now(),
    "successful" boolean
);


CREATE UNIQUE INDEX picks_pkey ON public.picks USING btree (id);

alter table "public"."picks" add constraint "picks_pkey" PRIMARY KEY using index "picks_pkey";

alter table "public"."picks" add constraint "picks_account_fkey" FOREIGN KEY (account) REFERENCES accounts(user_id) not valid;

alter table "public"."picks" validate constraint "picks_account_fkey";

alter table "public"."picks" add constraint "picks_game_fkey" FOREIGN KEY (game) REFERENCES games(id) not valid;

alter table "public"."picks" validate constraint "picks_game_fkey";


