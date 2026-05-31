import { create } from 'zustand'

export type AuthUser = {
  id: number
  username: string
  firstName?: string | null
  lastName?: string | null
  email?: string | null
  status: string
  roles: string[]
}

type AuthState = {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  setSession: (token: string, user: AuthUser) => void
  clearSession: () => void
}

const storedToken = localStorage.getItem('auth_token')
const storedUser = localStorage.getItem('auth_user')

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: Boolean(storedToken && storedUser),
  setSession: (token, user) => {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))
    set({ token, user, isAuthenticated: true })
  },
  clearSession: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    set({ token: null, user: null, isAuthenticated: false })
  },
}))
