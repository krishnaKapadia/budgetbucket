/** @format */
import { createClient } from "@supabase/supabase-js";

/**
 * Init the connection to the Supabase API.
 */

const supabaseApiClient = createClient(
  process.env.REACT_APP_SUPABASE_API_URI,
  process.env.REACT_APP_SUPABASE_API_KEY
);

export { supabaseApiClient as apiClient };
