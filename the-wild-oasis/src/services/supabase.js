import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rwearwftyohbvueflxij.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZWFyd2Z0eW9oYnZ1ZWZseGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NTE5MDUsImV4cCI6MjAxNjMyNzkwNX0.fOLiaN2RT4cN15_RccT2Pp-gLxplb4Mv3s7KX-A8Iyg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
