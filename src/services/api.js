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
}

export default new ApiService()
