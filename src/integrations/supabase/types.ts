export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      claim_submissions: {
        Row: {
          claim_amount: string
          created_at: string
          description: string
          email: string
          evidence_links: string | null
          id: string
          incident_date: string
          name: string
          project_name: string
          resolution_notes: string | null
          status: string
          telegram_username: string | null
          wallet_address: string
          x_username: string | null
        }
        Insert: {
          claim_amount: string
          created_at?: string
          description: string
          email: string
          evidence_links?: string | null
          id?: string
          incident_date: string
          name: string
          project_name: string
          resolution_notes?: string | null
          status?: string
          telegram_username?: string | null
          wallet_address: string
          x_username?: string | null
        }
        Update: {
          claim_amount?: string
          created_at?: string
          description?: string
          email?: string
          evidence_links?: string | null
          id?: string
          incident_date?: string
          name?: string
          project_name?: string
          resolution_notes?: string | null
          status?: string
          telegram_username?: string | null
          wallet_address?: string
          x_username?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          reason: string | null
          status: string
          telegram_username: string | null
          x_username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          reason?: string | null
          status?: string
          telegram_username?: string | null
          x_username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          reason?: string | null
          status?: string
          telegram_username?: string | null
          x_username?: string | null
        }
        Relationships: []
      }
      listings: {
        Row: {
          created_at: string
          escrow_address: string
          id: string
          nft_id: string | null
          price: number
          status: string
        }
        Insert: {
          created_at?: string
          escrow_address: string
          id?: string
          nft_id?: string | null
          price: number
          status?: string
        }
        Update: {
          created_at?: string
          escrow_address?: string
          id?: string
          nft_id?: string | null
          price?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
        ]
      }
      nfts: {
        Row: {
          created_at: string
          id: string
          image_url: string
          mint_address: string
          name: string
          price: number
          remaining_supply: number
          tier: string
          total_supply: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          mint_address: string
          name: string
          price: number
          remaining_supply: number
          tier: string
          total_supply: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          mint_address?: string
          name?: string
          price?: number
          remaining_supply?: number
          tier?: string
          total_supply?: number
        }
        Relationships: []
      }
      payment_records: {
        Row: {
          amount_paid: string
          created_at: string
          date_paid: string
          email: string
          id: string
          payment_status: string
          payment_type: string | null
          signature_hash: string
          username: string
          wallet_address: string
        }
        Insert: {
          amount_paid?: string
          created_at?: string
          date_paid: string
          email: string
          id?: string
          payment_status?: string
          payment_type?: string | null
          signature_hash: string
          username: string
          wallet_address: string
        }
        Update: {
          amount_paid?: string
          created_at?: string
          date_paid?: string
          email?: string
          id?: string
          payment_status?: string
          payment_type?: string | null
          signature_hash?: string
          username?: string
          wallet_address?: string
        }
        Relationships: []
      }
      presale_applications: {
        Row: {
          created_at: string
          email: string
          id: string
          investment_amount: string
          name: string
          presale_round: string | null
          reason_to_participate: string | null
          status: string
          telegram_username: string | null
          wallet_address: string
          x_username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          investment_amount: string
          name: string
          presale_round?: string | null
          reason_to_participate?: string | null
          status?: string
          telegram_username?: string | null
          wallet_address: string
          x_username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          investment_amount?: string
          name?: string
          presale_round?: string | null
          reason_to_participate?: string | null
          status?: string
          telegram_username?: string | null
          wallet_address?: string
          x_username?: string | null
        }
        Relationships: []
      }
      sales: {
        Row: {
          buyer_address: string
          created_at: string
          id: string
          nft_id: string | null
          price: number
          seller_address: string
          transaction_signature: string
        }
        Insert: {
          buyer_address: string
          created_at?: string
          id?: string
          nft_id?: string | null
          price: number
          seller_address: string
          transaction_signature: string
        }
        Update: {
          buyer_address?: string
          created_at?: string
          id?: string
          nft_id?: string | null
          price?: number
          seller_address?: string
          transaction_signature?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_registrations: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          package_type: string
          telegram_username: string | null
          wallet_address: string
          x_username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          package_type: string
          telegram_username?: string | null
          wallet_address: string
          x_username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          package_type?: string
          telegram_username?: string | null
          wallet_address?: string
          x_username?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
