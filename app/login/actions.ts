'use server';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Authenticate the user
  const { data, error } = await supabase.auth.signInWithPassword({ 
    email, 
    password 
  });

  if (error) {
    return { error: error.message };
  }

  // 2. Security Check: Ensure they have the 'admin' role in metadata
  const isAdmin = data.user?.app_metadata?.role === 'admin';
  
  if (!isAdmin) {
    // If they aren't an admin, sign them out immediately
    await supabase.auth.signOut();
    return { error: "Access Denied: Admin privileges required." };
  }

  // 3. Success
  return { success: true };
}