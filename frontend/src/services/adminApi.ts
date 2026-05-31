import { apiRequest } from './api'

export type AdminRecord = Record<string, string | number | boolean | null>

export const listAdminResource = (resource: string, token: string | null) =>
  apiRequest<{ items: AdminRecord[] }>(`/api/admin/${resource}`, { token })

export const createAdminResource = (resource: string, data: AdminRecord, token: string | null) =>
  apiRequest<{ item: AdminRecord }>(`/api/admin/${resource}`, {
    method: 'POST',
    token,
    body: JSON.stringify(data),
  })

export const updateAdminResource = (resource: string, id: number | string, data: AdminRecord, token: string | null) =>
  apiRequest<{ item: AdminRecord }>(`/api/admin/${resource}/${id}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(data),
  })

export const deleteAdminResource = (resource: string, id: number | string, token: string | null) =>
  apiRequest<{ deleted: boolean }>(`/api/admin/${resource}/${id}`, {
    method: 'DELETE',
    token,
  })

export const getAdminSummary = (token: string | null) => apiRequest<{ counts: Record<string, number> }>('/api/admin/summary', { token })
