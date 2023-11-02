CREATE UNIQUE INDEX unique_game_account ON public.spread_picks USING btree (game, account);

alter table "public"."spread_picks" add constraint "unique_game_account" UNIQUE using index "unique_game_account";


