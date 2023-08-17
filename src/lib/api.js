import { createClient } from "@supabase/supabase-js";
import { supabaseApi, supabaseSecretKey, supabasePublicKey, supabaseJwtToken } from "./constants";

export const supabase = createClient(
    supabaseApi,
    supabaseSecretKey
);