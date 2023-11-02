export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          community: number | null
          created_at: string
          display_name: string
          profile_picture_url: string
          user_id: string
          username: string
        }
        Insert: {
          community?: number | null
          created_at?: string
          display_name: string
          profile_picture_url?: string
          user_id: string
          username: string
        }
        Update: {
          community?: number | null
          created_at?: string
          display_name?: string
          profile_picture_url?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_community_fkey"
            columns: ["community"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      communities: {
        Row: {
          id: number
          logo_url: string | null
          name: string
        }
        Insert: {
          id?: number
          logo_url?: string | null
          name: string
        }
        Update: {
          id?: number
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          away_score: number | null
          away_spread: number
          away_team: number
          final: boolean | null
          home_score: number | null
          home_spread: number
          home_team: number
          id: number
          last_updated: string
          odds_api_id: string | null
          over_under: number | null
          start: string
        }
        Insert: {
          away_score?: number | null
          away_spread: number
          away_team: number
          final?: boolean | null
          home_score?: number | null
          home_spread: number
          home_team: number
          id?: number
          last_updated?: string
          odds_api_id?: string | null
          over_under?: number | null
          start: string
        }
        Update: {
          away_score?: number | null
          away_spread?: number
          away_team?: number
          final?: boolean | null
          home_score?: number | null
          home_spread?: number
          home_team?: number
          id?: number
          last_updated?: string
          odds_api_id?: string | null
          over_under?: number | null
          start?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_away_team_fkey"
            columns: ["away_team"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_home_team_fkey"
            columns: ["home_team"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      spread_picks: {
        Row: {
          account: string
          content: Json | null
          created_at: string
          game: number
          id: number
          selection: number
          spread: number
          successful: boolean | null
        }
        Insert: {
          account: string
          content?: Json | null
          created_at?: string
          game: number
          id?: number
          selection: number
          spread: number
          successful?: boolean | null
        }
        Update: {
          account?: string
          content?: Json | null
          created_at?: string
          game?: number
          id?: number
          selection?: number
          spread?: number
          successful?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "spread_picks_account_fkey"
            columns: ["account"]
            referencedRelation: "accounts"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "spread_picks_game_fkey"
            columns: ["game"]
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spread_picks_selection_fkey"
            columns: ["selection"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          abbreviation: string
          city: string | null
          full_name: string
          icon_logo_url: string | null
          id: number
          league: string | null
          primary_color: string | null
          primary_logo_url: string
          team_name: string | null
        }
        Insert: {
          abbreviation: string
          city?: string | null
          full_name: string
          icon_logo_url?: string | null
          id?: number
          league?: string | null
          primary_color?: string | null
          primary_logo_url: string
          team_name?: string | null
        }
        Update: {
          abbreviation?: string
          city?: string | null
          full_name?: string
          icon_logo_url?: string | null
          id?: number
          league?: string | null
          primary_color?: string | null
          primary_logo_url?: string
          team_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

