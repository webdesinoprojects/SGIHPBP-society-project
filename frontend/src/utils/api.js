// Frontend API utility functions
const API_BASE_URL = 'http://localhost:4000/api'

class APIClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Content API
  async getContent(key) {
    return this.request(`/content/${key}`)
  }

  async updateContent(key, value) {
    return this.request(`/content/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value })
    })
  }

  // Contact API
  async submitContact(contactData) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData)
    })
  }

  // Membership API
  async submitMembershipApplication(applicationData) {
    return this.request('/membership/apply', {
      method: 'POST',
      body: JSON.stringify(applicationData)
    })
  }

  async getMembershipFees() {
    return this.request('/membership/fees/calculate')
  }

  // Events API
  async getEvents() {
    return this.request('/events')
  }

  async getUpcomingEvents() {
    return this.request('/events/upcoming')
  }

  async getEvent(id) {
    return this.request(`/events/${id}`)
  }

  async registerForEvent(eventId, registrationData) {
    return this.request(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify(registrationData)
    })
  }

  // Publications API
  async getPublications(filters = {}) {
    const params = new URLSearchParams(filters).toString()
    const endpoint = params ? `/publications?${params}` : '/publications'
    return this.request(endpoint)
  }

  async getFeaturedPublications() {
    return this.request('/publications/featured')
  }

  async getPublicationCategories() {
    return this.request('/publications/categories')
  }

  async getPublication(id) {
    return this.request(`/publications/${id}`)
  }

  async trackDownload(id) {
    return this.request(`/publications/${id}/download`, {
      method: 'POST'
    })
  }

  // Testimonials API (existing)
  async getTestimonials() {
    return this.request('/testimonials')
  }

  async submitTestimonial(testimonialData) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData)
    })
  }
}

export const apiClient = new APIClient()

// Hook-like functions for React components
export const useAPI = () => {
  return {
    apiClient,
    
    // Utility functions
    handleAPIError: (error, setError) => {
      console.error('API Error:', error)
      setError(error.message || 'An unexpected error occurred')
    },
    
    // Loading states helper
    createLoadingState: () => ({
      loading: false,
      error: null,
      data: null
    })
  }
}

export default apiClient