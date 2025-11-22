import authService from './authService.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

/**
 * Service API pour gérer les requêtes vers le backend
 */
class ApiService {
  /**
   * Effectue une requête HTTP
   * @param {string} endpoint - L'endpoint de l'API
   * @param {Object} options - Options de la requête fetch
   * @returns {Promise<Object>} - La réponse JSON
   */
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    console.log('🌐 API Request:', {
      url,
      method: config.method || 'GET',
      headers: config.headers,
      body: config.body
    })

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erreur API:', error)
      throw error
    }
  }

  /**
   * Générer un persona unique basé sur les critères
   * @param {Object} criteria - Les critères pour générer le persona
   * @returns {Promise<Object>} - Le persona généré
   */
  async generatePersona(criteria) {
    return this.request('/api/persona/generate', {
      method: 'POST',
      body: JSON.stringify(criteria),
    })
  }

  /**
   * Générer plusieurs personas
   * @param {Object} criteria 
   * @param {number} count
   * @returns {Promise<Object>} 
   */
  async generateMultiplePersonas(criteria, count = 3) {
    return this.request('/api/persona/generate-multiple', {
      method: 'POST',
      body: JSON.stringify({ criteria, count }),
    })
  }

  /**
   * Améliorer un persona existant
   * @param {Object} persona
   * @param {string} focusArea 
   * @returns {Promise<Object>}
   */
  async enhancePersona(persona, focusArea = 'all') {
    return this.request('/api/persona/enhance', {
      method: 'POST',
      body: JSON.stringify({ persona, focusArea }),
    })
  }

  /**
   * Générer un template UX au format SVG pour un persona
   * @param {Object} persona - Le persona à transformer en template
   * @returns {Promise<Object>}
   */
  async generateUxTemplate(persona) {
    return this.request('/api/persona/generate-ux-template', {
      method: 'POST',
      body: JSON.stringify({ persona }),
    })
  }

  /**
   * Vérifier que l'API fonctionne
   * @returns {Promise<Object>}
   */
  async healthCheck() {
    return this.request('/api/persona/health', {
      method: 'GET',
    })
  }

  // ==================== Gestion des personas sauvegardés ====================

  /**
   * Récupérer tous les personas sauvegardés de l'utilisateur
   * @returns {Promise<Object>}
   */
  async getSavedPersonas() {
    return this.request('/api/save-persona', {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    })
  }

  /**
   * Récupérer un persona sauvegardé spécifique
   * @param {string} id - L'ID du persona
   * @returns {Promise<Object>}
   */
  async getSavedPersonaById(id) {
    return this.request(`/api/save-persona/${id}`, {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    })
  }

  /**
   * Récupérer tous les personas actifs
   * @returns {Promise<Object>}
   */
  async getActivePersonas() {
    return this.request('/api/save-persona/active/all', {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    })
  }

  /**
   * Créer/Sauvegarder un nouveau persona
   * @param {Object} personaData - Les données du persona
   * @returns {Promise<Object>}
   */
  async savePersona(personaData) {
    return this.request('/api/save-persona', {
      method: 'POST',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(personaData),
    })
  }

  /**
   * Mettre à jour un persona existant
   * @param {string} id - L'ID du persona
   * @param {Object} personaData - Les nouvelles données
   * @returns {Promise<Object>}
   */
  async updateSavedPersona(id, personaData) {
    return this.request(`/api/save-persona/${id}`, {
      method: 'PUT',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(personaData),
    })
  }

  /**
   * Supprimer un persona sauvegardé
   * @param {string} id - L'ID du persona
   * @returns {Promise<Object>}
   */
  async deleteSavedPersona(id) {
    return this.request(`/api/save-persona/${id}`, {
      method: 'DELETE',
      headers: authService.getAuthHeaders(),
    })
  }
}

export default new ApiService()
