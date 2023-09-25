create table "public"."accounts" (
    "user_id" uuid not null,
    "username" text not null,
    "display_name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "profile_picture_url" text
);


CREATE UNIQUE INDEX accounts_pkey ON public.accounts USING btree (user_id);

CREATE UNIQUE INDEX accounts_user_id_key ON public.accounts USING btree (user_id);

CREATE UNIQUE INDEX accounts_username_key ON public.accounts USING btree (username);

alter table "public"."accounts" add constraint "accounts_pkey" PRIMARY KEY using index "accounts_pkey";

alter table "public"."accounts" add constraint "accounts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."accounts" validate constraint "accounts_user_id_fkey";

alter table "public"."accounts" add constraint "accounts_user_id_key" UNIQUE using index "accounts_user_id_key";

alter table "public"."accounts" add constraint "accounts_username_key" UNIQUE using index "accounts_username_key";


