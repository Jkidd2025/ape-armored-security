// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iuejqyuvkwwwbqxkciui.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1ZWpxeXV2a3d3d2JxeGtjaXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNjE1NDgsImV4cCI6MjA1ODkzNzU0OH0.20BcXdHE4YdGt2HOSwW-w2W7vl7vHnA7e4Wb2ecqhwU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);