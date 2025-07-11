import axios from 'axios'
import { AppError } from '@/utils/AppError'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.registerInterceptTokenManager = (signOut) => {
  api.interceptors.response.use(
    (response) => response, // Nenhum erro na resposta, nada a ser feito
    async (requestError) => {
      // Verificando se é um erro 401/403 (Unauthorized). Possível problema com token, deslogar usuário
      if (
        requestError.response?.status === 401 ||
        requestError.response?.status === 403 ||
        requestError.response?.data?.message?.includes('não autorizado') ||
        requestError.response?.data?.message?.includes('token')
      ) {
        signOut()
        return Promise.reject(requestError)
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(requestError)
      }
    },
  )
}
