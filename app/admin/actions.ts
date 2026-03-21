'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * HELPER: Security Gatekeeper
 * Ensures only users with the { role: "admin" } metadata can proceed
 */
async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Logic: No user or no admin role = Throw error
  if (!user || user.app_metadata?.role !== 'admin') {
    throw new Error("Unauthorized: Admin access required.");
  }
}

/** * 1. EVENT ACTIONS 
 **/
export async function addEvent(formData: FormData) {
  try {
    await checkAdmin(); // Security Check
    const supabase = await createClient();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const event_date = formData.get('event_date') as string;
    const imageFile = formData.get('image') as File;

    let publicUrl = '';
    
    if (imageFile && imageFile.size > 0) {
      const fileName = `event-${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, imageFile);

      if (!uploadError) {
        const { data } = supabase.storage.from('gallery').getPublicUrl(fileName);
        publicUrl = data.publicUrl;
      }
    }

    const { error } = await supabase.from('events').insert([
      { title, description, event_date, image_url: publicUrl }
    ]);
    
    if (error) throw error;
    
    revalidatePath('/', 'layout');
    revalidatePath('/admin');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

/** * 2. APPLICATION ACTIONS 
 **/
export async function getApplications() {
  await checkAdmin(); // Only admins should see the list of applicants
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) console.error("Fetch Apps Failed:", error.message);
  return data || [];
}

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await checkAdmin();
    const supabase = await createClient();
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin');
    revalidatePath('/'); 
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteApplication(id: string) {
  try {
    await checkAdmin();
    const supabase = await createClient();
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getApplicationStats() {
  await checkAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.from('applications').select('status');
  
  if (error) return { pending: 0, approved: 0, rejected: 0 };

  return {
    pending: data?.filter((a: any) => a.status === 'pending').length || 0,
    approved: data?.filter((a: any) => a.status === 'approved').length || 0,
    rejected: data?.filter((a: any) => a.status === 'rejected').length || 0,
  };
}

/** * 3. GALLERY & HERO ACTIONS 
 **/
export async function uploadGalleryImage(formData: FormData) {
  try {
    await checkAdmin();
    const supabase = await createClient();
    const title = formData.get('title') as string;
    const imageFile = formData.get('image') as File;
    
    if (!imageFile || imageFile.size === 0) throw new Error("No file selected");

    const fileName = `gallery-${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const { error: uploadError } = await supabase.storage.from('gallery').upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(fileName);
    const { error: dbError } = await supabase.from('gallery').insert([{ title, image_url: publicUrl }]);
    
    if (dbError) throw dbError;

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function uploadHeroImage(formData: FormData) {
  try {
    await checkAdmin();
    const supabase = await createClient();
    const imageFile = formData.get('image') as File;
    
    if (!imageFile || imageFile.size === 0) throw new Error("No image selected");

    const fileName = `hero-${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const { error: uploadError } = await supabase.storage.from('gallery').upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(fileName);
    const { error: dbError } = await supabase.from('hero_slides').insert([{ image_url: publicUrl, is_active: true }]);
    
    if (dbError) throw dbError;
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteHeroImage(id: string) {
  try {
    await checkAdmin();
    const supabase = await createClient();
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    
    if (error) throw error;
    
    revalidatePath('/', 'layout');
    revalidatePath('/admin');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// These stay the same as they are read-only and used on the public home page
export async function getHeroImages() {
  const supabase = await createClient();
  const { data } = await supabase.from('hero_slides').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function getApprovedMembers() {
  const supabase = await createClient(); // Ensure this matches your server/client setup
  
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('status', 'approved')
    .order('full_name', { ascending: true });

  if (error) {
    console.error("Error fetching members:", error.message);
    return [];
  }
  return data || [];
}