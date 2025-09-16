import { createClient } from '@supabase/supabase-js'
export function getAdminClient(){ const url=process.env.NEXT_PUBLIC_SUPABASE_URL; const srv=process.env.SUPABASE_SERVICE_ROLE_KEY; if(!url||!srv) return null; return createClient(url, srv, { auth:{ persistSession:false } }) }
