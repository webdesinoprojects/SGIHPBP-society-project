import React, { useCallback, useEffect, useState } from 'react';
import AdminShell from '../../components/admin/AdminShell';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import SEO from '../../components/SEO';
import { useAuth } from '../../hooks/useAuth';
import {
  createHomeNotice,
  deleteHomeNotice,
  formatNoticeDate,
  listHomeNotices,
  updateHomeNotice,
} from '../../lib/homeNotices';
import { AdminStyles, Field, FormActions, StatusBlock } from '../../components/admin/ContentAdminPrimitives';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

const newForm = () => ({
  title: '',
  message: '',
  notice_type: 'Notice',
  published_on: new Date().toISOString().slice(0, 10),
  is_published: true,
  sort_order: 0,
});

const AdminHomeNotices = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState(newForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [pendingDelete, setPendingDelete] = useState(null);

  const loadAll = useCallback(async () => {
    setNotices(await listHomeNotices({ admin: true }));
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAll().catch((error) => {
      setStatus({ type: 'error', message: error.message || 'Unable to load homepage notices.' });
      setLoading(false);
    });
  }, [loadAll]);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    const channel = supabase
      .channel('admin-home-notices')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'home_notices' }, () => { loadAll().catch(() => {}); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [loadAll]);

  const updateField = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(newForm());
  };

  const edit = (notice) => {
    setEditingId(notice.id);
    setForm({
      title: notice.title || '',
      message: notice.message || '',
      notice_type: notice.notice_type || 'Notice',
      published_on: notice.published_on || new Date().toISOString().slice(0, 10),
      is_published: notice.is_published,
      sort_order: notice.sort_order || 0,
    });
    setStatus({ type: null, message: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const save = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please enter both a title and the full message.' });
      return;
    }
    setSaving(true);
    setStatus({ type: null, message: '' });
    try {
      if (editingId) {
        await updateHomeNotice(editingId, form);
        setStatus({ type: 'success', message: 'Homepage notice updated.' });
      } else {
        await createHomeNotice(form, user?.id);
        setStatus({ type: 'success', message: 'Homepage notice published.' });
      }
      resetForm();
      await loadAll();
    } catch (error) {
      setStatus({ type: 'error', message: friendlyError(error.message) });
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (notice) => {
    try {
      await updateHomeNotice(notice.id, { ...notice, is_published: !notice.is_published });
      await loadAll();
    } catch (error) {
      setStatus({ type: 'error', message: friendlyError(error.message) });
    }
  };

  const remove = async () => {
    if (!pendingDelete) return;
    try {
      await deleteHomeNotice(pendingDelete.id);
      if (editingId === pendingDelete.id) resetForm();
      setPendingDelete(null);
      setStatus({ type: 'success', message: 'Homepage notice deleted.' });
      await loadAll();
    } catch (error) {
      setStatus({ type: 'error', message: friendlyError(error.message) });
    }
  };

  return (
    <AdminShell
      title="Homepage Notices"
      description="Publish news and intimations beside the mission on the homepage."
      action={editingId && <button type="button" onClick={resetForm} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-primary">New notice</button>}
    >
      <SEO title="Admin Homepage Notices" description="Manage homepage notices." keywords="admin homepage notices" />
      <StatusBlock status={status} />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={save} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm xl:sticky xl:top-6 xl:self-start xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-DEFAULT">{editingId ? 'Edit notice' : 'Create notice'}</p>
          <h2 className="mt-1 text-2xl font-bold text-primary">News or intimation</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Title">
              <input name="title" value={form.title} onChange={updateField} required maxLength={180} className="field-input" placeholder="e.g. Annual conference registration opens" />
            </Field>
            <Field label="Full message">
              <textarea name="message" value={form.message} onChange={updateField} required rows={9} className="field-input" placeholder="Enter the complete notice. Paragraphs and line breaks will be preserved." />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Category">
                <select name="notice_type" value={form.notice_type} onChange={updateField} className="field-input">
                  <option>Notice</option><option>News</option><option>Intimation</option><option>Announcement</option>
                </select>
              </Field>
              <Field label="Display date">
                <input type="date" name="published_on" value={form.published_on} onChange={updateField} required className="field-input" />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Sort order">
                <input type="number" name="sort_order" value={form.sort_order} onChange={updateField} className="field-input" />
              </Field>
              <label className="mt-6 flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-sm font-bold text-gray-700">
                <input type="checkbox" name="is_published" checked={form.is_published} onChange={updateField} className="h-4 w-4" />
                Show on homepage
              </label>
            </div>
            <FormActions editing={Boolean(editingId)} saving={saving} onClear={resetForm} createLabel="Publish notice" updateLabel="Save notice" />
          </div>
        </form>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-DEFAULT">All notices</p><h2 className="mt-1 text-2xl font-bold text-primary">{notices.length} entries</h2></div>
            <a href="/" className="text-sm font-bold text-primary hover:underline">Open homepage</a>
          </div>
          {loading ? <p className="mt-6 text-center text-sm font-semibold text-gray-500">Loading...</p> : (
            <div className="mt-5 grid gap-3">
              {notices.map((notice) => (
                <article key={notice.id} className="rounded-lg border border-gray-100 bg-[#fbfcfe] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${notice.is_published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{notice.is_published ? 'Published' : 'Draft'}</span>
                        <span className="text-xs font-semibold text-gray-500">{notice.notice_type} • {formatNoticeDate(notice.published_on)} • Sort: {notice.sort_order}</span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-gray-900">{notice.title}</h3>
                      <p className="mt-1 line-clamp-2 whitespace-pre-line text-sm leading-5 text-gray-600">{notice.message}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button type="button" onClick={() => edit(notice)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-primary hover:bg-gray-50">Edit</button>
                      <button type="button" onClick={() => togglePublished(notice)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-primary hover:bg-gray-50">{notice.is_published ? 'Unpublish' : 'Publish'}</button>
                      <button type="button" onClick={() => setPendingDelete(notice)} className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50">Delete</button>
                    </div>
                  </div>
                </article>
              ))}
              {notices.length === 0 && <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center font-semibold text-gray-500">No homepage notices yet.</div>}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog open={Boolean(pendingDelete)} title="Delete notice?" body={`“${pendingDelete?.title || ''}” will be permanently removed.`} confirmLabel="Delete" destructive onConfirm={remove} onCancel={() => setPendingDelete(null)} />
      <AdminStyles />
    </AdminShell>
  );
};

function friendlyError(message = '') {
  if (message.toLowerCase().includes('row-level security') || message.toLowerCase().includes('permission')) return 'You do not have permission to manage homepage notices.';
  if (message.toLowerCase().includes('home_notices')) return 'The homepage notice database has not been set up yet. Apply the latest Supabase migration.';
  return message || 'The homepage notice could not be saved.';
}

export default AdminHomeNotices;
