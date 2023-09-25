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
          created_at: string
          display_name: string
          profile_picture_url: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          display_name: string
          profile_picture_url?: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          display_name?: string
          profile_picture_url?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      games: {
        Row: {
          away_score: number | null
          away_spread: number | null
          away_team: number
          final: boolean | null
          home_score: number | null
          home_spread: number | null
          home_team: number
          id: number
          over_under: number | null
          start: string
        }
        Insert: {
          away_score?: number | null
          away_spread?: number | null
          away_team: number
          final?: boolean | null
          home_score?: number | null
          home_spread?: number | null
          home_team: number
          id?: number
          over_under?: number | null
          start: string
        }
        Update: {
          away_score?: number | null
          away_spread?: number | null
          away_team?: number
          final?: boolean | null
          home_score?: number | null
          home_spread?: number | null
          home_team?: number
          id?: number
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
      scores: {
        Row: {
          account: string
          date: string
          score: number
        }
        Insert: {
          account: string
          date?: string
          score?: number
        }
        Update: {
          account?: string
          date?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "scores_account_fkey"
            columns: ["account"]
            referencedRelation: "accounts"
            referencedColumns: ["user_id"]
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
          primary_logo_url: string
          team_name: string | null
        }
        Insert: {
          abbreviation: string
          city?: string | null
          full_name: string
          icon_logo_url?: string | null
          id?: number
          primary_logo_url: string
          team_name?: string | null
        }
        Update: {
          abbreviation?: string
          city?: string | null
          full_name?: string
          icon_logo_url?: string | null
          id?: number
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

