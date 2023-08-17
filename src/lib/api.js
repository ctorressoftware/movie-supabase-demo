import { createClient } from "@supabase/supabase-js";
import { supabaseApi, supabaseSecretKey, supabasePublicKey, supabaseJwtToken } from "./constants";

export const supabase = createClient(
    "https://kscptdezabdcaceixcwg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzY3B0ZGV6YWJkY2FjZWl4Y3dnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjI4NDI1MywiZXhwIjoyMDA3ODYwMjUzfQ.NJEN-SpnlBTpqejztT5lVc4dGD_S9aFSLAJ7HUTE_Us"
);