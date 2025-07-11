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

export default function SignUpPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const { saveToken } = useAuth()
    const router = useRouter()

    function validateForm() {
        const newErrors = {}

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem'
        }

        if (password.length < 6) {
            newErrors.password = 'A senha deve ter pelo menos 6 caracteres'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSignUp(e) {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const response = await api.post('/auth/register', {
                nome: name,
                email,
                senha: password,
                confirmarSenha: confirmPassword
            })

            saveToken(response.data.token)
            toast.success('Conta criada com sucesso!')
            router.push('/dashboard')
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                toast.error('Erro de conexão. Tente novamente mais tarde.')
            } else {
                toast.error(error.response?.data?.message || 'Erro ao criar conta. Tente novamente.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Criar uma conta
                            </h1>
                            <p className="text-gray-600">
                                Preencha os dados abaixo
                            </p>
                        </div>

                        <form onSubmit={handleSignUp} className="space-y-6">
                            <InputText
                                label="Nome"
                                type="text"
                                placeholder="Seu nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

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
                                placeholder="Escolha uma senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                                required
                            />

                            <InputText
                                label="Confirmar Senha"
                                type="password"
                                placeholder="Digite a senha novamente"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={errors.confirmPassword}
                                required
                            />

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? 'Criando conta...' : 'Criar Conta'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link
                                href="/sign-in"
                                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Já possuo uma conta
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
