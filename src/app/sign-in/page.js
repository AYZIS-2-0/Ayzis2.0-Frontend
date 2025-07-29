'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import InputText from '@/components/InputText'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/libs/axios'
import { toast, ToastContainer } from 'react-toastify'
import { MdLogin } from 'react-icons/md'
import { userLogin } from '@/service/AuthService'

export default function SignInPage() {
    const [email, setEmail] = useState('')
    const [senha, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { saveToken } = useAuth()
    const router = useRouter()

    async function handleSignIn(e) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await userLogin({ email, senha })

            saveToken(response.data.token)
            toast.success('Login realizado com sucesso!')
            router.push('/dashboard')
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                toast.error('Erro de conexão. Tente novamente mais tarde.')
            } else {
                toast.error('Email ou senha inválidos. Por favor, tente novamente.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center py-12">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Fazer Login
                            </h1>
                            <p className="text-gray-600">
                                Entre com suas credenciais
                            </p>
                        </div>

                        <form onSubmit={handleSignIn} className="space-y-6">
                            <InputText
                                label="E-mail"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <InputText
                                label="Senha"
                                type="password"
                                placeholder="Sua senha"
                                value={senha}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Button
                                onClick={handleSignIn}
                                disabled={isLoading}
                                className="w-full"
                                icon={<MdLogin size={24} className="text-white" />}
                            >
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center space-y-2">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Esqueci minha senha
                            </Link>
                            <br />
                            <Link
                                href="/sign-up"
                                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Não tenho uma conta
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <ToastContainer position="bottom-right" />
        </div>
    )
}
