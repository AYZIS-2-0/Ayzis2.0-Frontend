'use client'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { User, LogOut } from 'lucide-react'

export default function Header({ authenticated = false, landing = false }) {
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        window.location.href = '/'
    }

    if (!authenticated) {
        return (
            <header className="bg-none">
                <div className="mx-20 px-2">
                    <div className="flex justify-start items-center h-20">
                        <Link href="/" className="text-3xl font-bold text-white">
                            AYZIS
                        </Link>
                    </div>
                </div>
            </header>
        )
    }

    return (
        <header className="border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-20 px-2">
                <div className="flex justify-between items-center h-16">
                    <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
                        AYZIS
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/dashboard/my-account"
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Minha conta"
                        >
                            <User size={24} className="text-gray-600" />
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Sair"
                        >
                            <LogOut size={24} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
