// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ifzawvutvxcpjdttkeco.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmemF3dnV0dnhjcGpkdHRrZWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDYyNTUsImV4cCI6MjA2MDQ4MjI1NX0.sDvHQzm-TqJv9FEarcPxUbqwxQuvsMd6QWnPh0VcAcM'              // Reemplaza esto también

export const supabase = createClient(supabaseUrl, supabaseKey)
