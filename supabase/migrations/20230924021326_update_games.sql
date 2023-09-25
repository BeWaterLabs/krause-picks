alter table "public"."games" drop column "away_team_spread";

alter table "public"."games" drop column "home_team_spread";

alter table "public"."games" add column "away_spread" real;

alter table "public"."games" add column "home_spread" real;


