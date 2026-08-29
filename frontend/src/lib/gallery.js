import { isSupabaseConfigured, supabase } from './supabase';
import { uploadContentFile } from './contentUpload';

export function slugifyName(value) {
  const slug = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || `item-${Date.now()}`;
}

export async function listGalleryCategories({ admin = false, signal } = {}) {
  if (!isSupabaseConfigured) return [];

  let query = supabase
    .from('gallery_categories')
    .select('id, slug, name, description, sort_order, is_active, created_at')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (!admin) query = query.eq('is_active', true);
  if (signal) query = query.abortSignal(signal);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function listGalleryImages({ admin = false, categoryId, signal } = {}) {
  if (!isSupabaseConfigured) return [];

  let query = supabase
    .from('gallery_images')
    .select(`
      id,
      category_id,
      title,
      description,
      image_url,
      image_path,
      imagekit_file_id,
      width,
      height,
      sort_order,
      is_active,
      created_at,
      gallery_categories ( id, slug, name )
    `)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (!admin) query = query.eq('is_active', true);
  if (categoryId) query = query.eq('category_id', categoryId);
  if (signal) query = query.abortSignal(signal);

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map((row) => ({
    ...row,
    category: row.gallery_categories,
    gallery_categories: undefined,
  }));
}

export async function createGalleryCategory(input, userId) {
  const slug = await uniqueCategorySlug(slugifyName(input.slug || input.name));
  const payload = {
    slug,
    name: input.name.trim(),
    description: input.description?.trim() || null,
    sort_order: Number(input.sort_order || 0),
    is_active: input.is_active ?? true,
    created_by: userId,
  };

  const { data, error } = await supabase
    .from('gallery_categories')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGalleryCategory(id, input) {
  const payload = {
    name: input.name.trim(),
    description: input.description?.trim() || null,
    sort_order: Number(input.sort_order || 0),
    is_active: input.is_active,
  };

  const { data, error } = await supabase
    .from('gallery_categories')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGalleryCategory(id) {
  const { error } = await supabase
    .from('gallery_categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function uploadGalleryImage(file, { folder = 'gallery' } = {}) {
  if (!file) throw new Error('Please choose an image file.');
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Please use a JPG, PNG or WebP image.');
  }
  if (file.size > 15 * 1024 * 1024) {
    throw new Error('Please use an image smaller than 15 MB.');
  }

  const prepared = await optimizeGalleryImage(file);
  const uploaded = await uploadContentFile(prepared.file, { folder, fallback: false });
  return {
    url: uploaded.url,
    path: uploaded.path,
    fileId: uploaded.fileId,
    width: prepared.width,
    height: prepared.height,
  };
}

export async function validateGalleryImageUrl(value) {
  const url = String(value || '').trim();
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Please enter a valid image URL.');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Please enter an HTTP or HTTPS image URL.');
  }

  await new Promise((resolve, reject) => {
    const image = new Image();
    const timeout = window.setTimeout(() => {
      image.src = '';
      reject(new Error('The image link took too long to load. Please check the URL.'));
    }, 10000);

    image.onload = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    image.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error('The image link is unavailable. Please use a direct public image URL.'));
    };
    image.src = url;
  });

  return url;
}

async function optimizeGalleryImage(file) {
  const bitmap = await loadImageBitmap(file);
  const maxDimension = 1920;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  if (scale === 1 && file.size <= 1.5 * 1024 * 1024) {
    bitmap.close?.();
    return { file, width, height };
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const outputType = file.type === 'image/png' ? 'image/webp' : file.type;
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error('The image could not be prepared for upload.'))),
      outputType,
      0.84,
    );
  });
  const extension = outputType === 'image/webp' ? 'webp' : 'jpg';
  const baseName = file.name.replace(/\.[^.]+$/, '') || 'gallery-image';
  const optimized = new File([blob], `${baseName}.${extension}`, { type: outputType });
  return { file: optimized, width, height };
}

async function loadImageBitmap(file) {
  if ('createImageBitmap' in window) return window.createImageBitmap(file);

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('The selected image could not be read.'));
    };
    image.src = url;
  });
}

export async function createGalleryImage(input, userId) {
  const payload = {
    category_id: input.category_id || null,
    title: input.title.trim(),
    description: input.description?.trim() || null,
    image_url: input.image_url,
    image_path: input.image_path || null,
    imagekit_file_id: input.imagekit_file_id || null,
    width: input.width || null,
    height: input.height || null,
    sort_order: Number(input.sort_order || 0),
    is_active: input.is_active ?? true,
    created_by: userId,
  };

  const { data, error } = await supabase
    .from('gallery_images')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGalleryImage(id, input) {
  const payload = {
    title: input.title.trim(),
    description: input.description?.trim() || null,
    category_id: input.category_id || null,
    sort_order: Number(input.sort_order || 0),
    is_active: input.is_active,
  };

  if (input.image_url !== undefined) payload.image_url = input.image_url;
  if (input.image_path !== undefined) payload.image_path = input.image_path;
  if (input.imagekit_file_id !== undefined) payload.imagekit_file_id = input.imagekit_file_id;
  if (input.width !== undefined) payload.width = input.width;
  if (input.height !== undefined) payload.height = input.height;

  const { data, error } = await supabase
    .from('gallery_images')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGalleryImage(id) {
  const { error } = await supabase
    .from('gallery_images')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

async function uniqueCategorySlug(baseSlug) {
  const { data, error } = await supabase
    .from('gallery_categories')
    .select('slug')
    .ilike('slug', `${baseSlug}%`);

  if (error) throw error;

  const existing = new Set((data || []).map((row) => row.slug));
  if (!existing.has(baseSlug)) return baseSlug;

  let counter = 2;
  while (existing.has(`${baseSlug}-${counter}`)) counter += 1;
  return `${baseSlug}-${counter}`;
}
