alter table "public"."games" add column "last_updated" timestamp with time zone not null default now();

alter table "public"."games" add column "odds_api_id" bigint;

CREATE UNIQUE INDEX games_odds_api_id_key ON public.games USING btree (odds_api_id);

alter table "public"."games" add constraint "games_odds_api_id_key" UNIQUE using index "games_odds_api_id_key";


