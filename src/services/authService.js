/**
 * Service d'authentification pour gérer les tokens JWT
 */
class AuthService {
  /**
   * Récupérer le token depuis le localStorage
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token')
  }

  /**
   * Sauvegarder le token dans le localStorage
   * @param {string} token
   */
  setToken(token) {
    localStorage.setItem('token', token)
  }

  /**
   * Supprimer le token du localStorage
   */
  removeToken() {
    localStorage.removeItem('token')
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getToken()
  }

  /**
   * Obtenir les headers d'authentification
   * @returns {Object}
   */
  getAuthHeaders() {
    const token = this.getToken()
    if (token) {
      return {
        Authorization: `Bearer ${token}`
      }
    }
    return {}
  }
}

export default new AuthService()
