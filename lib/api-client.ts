import axios, { type AxiosError, type AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"

// Constants
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ighota.org"
const TOKEN_COOKIE_NAME = "ighota_auth_token"

// Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "student" | "instructor" | "admin"
  createdAt: string
  updatedAt: string
  emailVerified?: boolean
}

export interface RegisterUserData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
}

export interface Flashcard {
  id: string
  front: string
  back: string
  lastReviewed?: string
  nextReview?: string
  difficulty?: "easy" | "medium" | "hard"
  courseId: string
  setId: string
}

export interface FlashcardSet {
  id: string
  title: string
  description: string
  courseId: string
  module: string
  cardCount: number
  lastStudied?: string
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_COOKIE_NAME)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh token (implementation depends on your backend)
        const refreshToken = Cookies.get("ighota_refresh_token")
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken,
          })

          const { token } = response.data
          Cookies.set(TOKEN_COOKIE_NAME, token)

          // Retry the original request with the new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return axios(originalRequest)
        }
      } catch (refreshError) {
        // If refresh token fails, log out the user
        Cookies.remove(TOKEN_COOKIE_NAME)
        Cookies.remove("ighota_refresh_token")
        window.location.href = "/auth/login?session=expired"
      }
    }

    return Promise.reject(error)
  },
)

// API utility functions
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    apiClient.get(url, config).then((res: AxiosResponse<T>) => res.data),
  
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    apiClient.post(url, data, config).then((res: AxiosResponse<T>) => res.data),
  
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    apiClient.put(url, data, config).then((res: AxiosResponse<T>) => res.data),
  
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    apiClient.patch(url, data, config).then((res: AxiosResponse<T>) => res.data),
  
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    apiClient.delete(url, config).then((res: AxiosResponse<T>) => res.data),
}

// Auth specific API functions
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      
      Cookies.set(TOKEN_COOKIE_NAME, response.token);
      Cookies.set('ighota_refresh_token', response.refreshToken);
      
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData: RegisterUserData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      
      Cookies.set(TOKEN_COOKIE_NAME, response.token);
      Cookies.set('ighota_refresh_token', response.refreshToken);
      
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
    Cookies.remove('ighota_refresh_token');
  },
  
  getCurrentUser: () => api.get<User>('/auth/me'),
  
  forgotPassword: (email: string) => api.post<{ message: string }>('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) => 
    api.post<{ message: string }>('/auth/reset-password', { token, password }),
  
  verifyEmail: (token: string) => api.post<{ message: string }>('/auth/verify-email', { token }),
  
  resendVerificationEmail: (email: string) => 
    api.post<{ message: string }>('/auth/resend-verification', { email }),
}

// Flashcard API functions
export const flashcardApi = {
  getFlashcardSets: (courseId: string) => 
    api.get<FlashcardSet[]>(`/courses/${courseId}/flashcard-sets`),
  
  getFlashcardSet: (courseId: string, setId: string) => 
    api.get<{ set: FlashcardSet; cards: Flashcard[] }>(`/courses/${courseId}/flashcard-sets/${setId}`),
  
  createFlashcardSet: (courseId: string, data: Omit<FlashcardSet, 'id' | 'cardCount'>) => 
    api.post<FlashcardSet>(`/courses/${courseId}/flashcard-sets`, data),
  
  updateFlashcardSet: (courseId: string, setId: string, data: Partial<Omit<FlashcardSet, 'id' | 'cardCount'>>) => 
    api.put<FlashcardSet>(`/courses/${courseId}/flashcard-sets/${setId}`, data),
  
  deleteFlashcardSet: (courseId: string, setId: string) => 
    api.delete<{ success: boolean }>(`/courses/${courseId}/flashcard-sets/${setId}`),
  
  createFlashcard: (courseId: string, setId: string, data: Omit<Flashcard, 'id' | 'courseId' | 'setId'>) => 
    api.post<Flashcard>(`/courses/${courseId}/flashcard-sets/${setId}/cards`, data),
  
  updateFlashcard: (courseId: string, setId: string, cardId: string, data: Partial<Omit<Flashcard, 'id' | 'courseId' | 'setId'>>) => 
    api.put<Flashcard>(`/courses/${courseId}/flashcard-sets/${setId}/cards/${cardId}`, data),
  
  deleteFlashcard: (courseId: string, setId: string, cardId: string) => 
    api.delete<{ success: boolean }>(`/courses/${courseId}/flashcard-sets/${setId}/cards/${cardId}`),
  
  updateFlashcardProgress: (courseId: string, setId: string, cardId: string, difficulty: 'easy' | 'medium' | 'hard') => 
    api.post<Flashcard>(`/courses/${courseId}/flashcard-sets/${setId}/cards/${cardId}/progress`, { difficulty }),
}

// Export apiClient as default and authApi as a named export
export default apiClient;
// Make sure authApi is exported as a named export;
