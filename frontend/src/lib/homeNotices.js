import { isSupabaseConfigured, supabase } from './supabase';
import { uploadContentFile } from './contentUpload';

const noticeFields = 'id, title, message, notice_type, published_on, is_published, sort_order, flyer_url, flyer_path, flyer_type, flyer_provider, flyer_file_id, created_at, updated_at';

export async function listHomeNotices({ admin = false, limit } = {}) {
  if (!isSupabaseConfigured) return [];

  let query = supabase
    .from('home_notices')
    .select(noticeFields)
    .order('sort_order', { ascending: true })
    .order('published_on', { ascending: false })
    .order('created_at', { ascending: false });

  if (!admin) query = query.eq('is_published', true).lte('published_on', new Date().toISOString().slice(0, 10));
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createHomeNotice(input, userId) {
  const payload = serialize(input);
  payload.created_by = userId || null;
  const { data, error } = await supabase.from('home_notices').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateHomeNotice(id, input) {
  const { data, error } = await supabase
    .from('home_notices')
    .update(serialize(input))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteHomeNotice(id) {
  const { error } = await supabase.from('home_notices').delete().eq('id', id);
  if (error) throw error;
}

export async function uploadHomeNoticeFlyer(file) {
  if (!file) throw new Error('Please choose a flyer file.');
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please use a JPG, PNG, WebP or PDF flyer.');
  }
  if (file.size > 15 * 1024 * 1024) {
    throw new Error('Please use a flyer smaller than 15 MB.');
  }

  const uploaded = await uploadContentFile(file, { folder: 'home-notices/flyers', fallback: false });
  return {
    url: uploaded.url,
    path: uploaded.path,
    type: uploaded.mimeType || file.type,
    provider: uploaded.provider,
    fileId: uploaded.fileId,
  };
}

export function normalizeFlyerUrl(value = '') {
  const url = String(value).trim();
  if (!url) return null;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Please enter a valid flyer URL.');
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('The flyer URL must use HTTP or HTTPS.');
  }
  return parsed.toString();
}

export function formatNoticeDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`));
}

function serialize(input) {
  return {
    title: String(input.title || '').trim(),
    message: String(input.message || '').trim(),
    notice_type: String(input.notice_type || 'Notice').trim(),
    published_on: input.published_on || new Date().toISOString().slice(0, 10),
    is_published: Boolean(input.is_published),
    sort_order: Number(input.sort_order || 0),
    flyer_url: normalizeFlyerUrl(input.flyer_url),
    flyer_path: input.flyer_path || null,
    flyer_type: input.flyer_type || null,
    flyer_provider: input.flyer_provider || null,
    flyer_file_id: input.flyer_file_id || null,
  };
}
