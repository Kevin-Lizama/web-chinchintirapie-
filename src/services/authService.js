// En desarrollo usa el proxy de package.json ('/api/auth')
// En producción (Render) usará la URL del backend definida en REACT_APP_API_URL
const API_BASE = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/auth` : '/api/auth';

/**
 * Servicio de autenticación usando fetch nativo.
 * Se conecta al backend Spring Boot JWT en /api/auth/*
 */
const authService = {
  /**
   * Registrar nuevo usuario
   * @param {string} fullName
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token, tokenType, userId, fullName, email, role}>}
   */
  async register(fullName, email, password) {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // El backend puede devolver un mensaje de error o un objeto con detalles
      const errorMsg = data.message || data.error || 'Error al registrarse';
      throw new Error(errorMsg);
    }

    // Guardar token y datos del usuario en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    }));

    return data;
  },

  /**
   * Iniciar sesión
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token, tokenType, userId, fullName, email, role}>}
   */
  async login(email, password) {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || data.error || 'Credenciales incorrectas';
      throw new Error(errorMsg);
    }

    // Guardar token y datos del usuario en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    }));

    return data;
  },

  /**
   * Cerrar sesión — limpia localStorage
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Obtener token JWT guardado
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Obtener datos del usuario guardado
   * @returns {{id, fullName, email, role}|null}
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Verificar si hay sesión activa
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /**
   * Helper para hacer peticiones autenticadas a la API
   * @param {string} url
   * @param {object} options
   * @returns {Promise<Response>}
   */
  async authFetch(url, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    return fetch(url, { ...options, headers });
  },
};

export default authService;
