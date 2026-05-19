import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://arelyvrwosppzlzrgbdt.supabase.co";
const supabaseAnonKey = "sb_publishable_eYMQNCI2Y8qQ7yoYkj8KRQ_DcounE8o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);