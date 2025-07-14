import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContextProvider } from '@/contexts/AuthContext'

export const metadata = {
  title: 'Ayzis',
  description: 'Sistema de gestão e análise',
  icons: {
    icon: '/globe.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AuthContextProvider>
          <div className='bg-gradient-to-br from-indigo-950 to-gray-900'>
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
