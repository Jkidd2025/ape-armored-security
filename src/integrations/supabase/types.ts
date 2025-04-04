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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
