import React, { useState, useEffect } from 'react';
import { apiClient } from '../utils/api';

const Admin = () => {
  const [contacts, setContacts] = useState([]);
  const [membershipApplications, setMembershipApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [contactsData, membershipData] = await Promise.all([
        apiClient.request('/contacts'),
        apiClient.request('/membership')
      ]);
      
      setContacts(contactsData);
      setMembershipApplications(membershipData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await apiClient.request(`/contacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      loadData(); // Refresh data
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading admin data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center text-red-600 dark:text-red-400">
          <span className="material-symbols-outlined text-4xl">error</span>
          <p className="mt-4">Error: {error}</p>
          <button 
            onClick={loadData}
            className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-6 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage contact forms and membership applications</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contacts'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Contact Messages ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('membership')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'membership'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Membership Applications ({membershipApplications.length})
          </button>
        </nav>
      </div>

      {/* Contact Messages Tab */}
      {activeTab === 'contacts' && (
        <div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Form Submissions</h2>
            </div>
            
            {contacts.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No contact messages yet.
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {contacts.map((contact) => (
                  <div key={contact.id} className="px-6 py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {contact.name}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contact.status === 'read' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {contact.status || 'unread'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {contact.email}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">
                          Subject: {contact.subject}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                          {contact.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                          Submitted: {formatDate(contact.createdAt)}
                        </p>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        {contact.status !== 'read' && (
                          <button
                            onClick={() => updateContactStatus(contact.id, 'read')}
                            className="text-sm bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded"
                          >
                            Mark as Read
                          </button>
                        )}
                        <a
                          href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                          className="text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 rounded"
                        >
                          Reply
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Membership Applications Tab */}
      {activeTab === 'membership' && (
        <div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Membership Applications</h2>
            </div>
            
            {membershipApplications.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No membership applications yet.
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {membershipApplications.map((app) => (
                  <div key={app.id} className="px-6 py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {app.fullName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            app.status === 'approved' 
                              ? 'bg-green-100 text-green-800'
                              : app.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {app.email} • {app.phone}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          <strong>Qualification:</strong> {app.qualification}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Membership Type:</strong> {app.membershipType} (₹{app.applicationFee})
                        </p>
                        {app.institution && (
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Institution:</strong> {app.institution}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                          Applied: {formatDate(app.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Admin;