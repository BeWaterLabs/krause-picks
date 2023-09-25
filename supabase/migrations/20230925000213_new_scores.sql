create table "public"."scores" (
    "date" date not null,
    "account" uuid not null,
    "score" bigint not null default '0'::bigint
);


CREATE UNIQUE INDEX scores_pkey ON public.scores USING btree (date, account);

alter table "public"."scores" add constraint "scores_pkey" PRIMARY KEY using index "scores_pkey";

alter table "public"."scores" add constraint "scores_account_fkey" FOREIGN KEY (account) REFERENCES accounts(user_id) ON DELETE CASCADE not valid;

alter table "public"."scores" validate constraint "scores_account_fkey";


