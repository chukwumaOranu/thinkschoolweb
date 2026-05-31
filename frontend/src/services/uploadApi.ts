import { apiRequest } from './api'

export type UploadResponse = {
  file: {
    preset: string
    originalName: string
    mimeType: string
    path: string
    url: string
    width: number
    height: number
    format: string
  }
}

export const uploadImage = (preset: string, file: File, token: string | null) => {
  const body = new FormData()
  body.append('image', file)

  return apiRequest<UploadResponse>(`/api/uploads/${preset}`, {
    method: 'POST',
    token,
    body,
  })
}
