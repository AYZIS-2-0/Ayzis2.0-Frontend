import { api } from "@/libs/axios";

export async function userLogin({ email, senha }) {
    try {
        const response = await api.post('/auth/login', {
            email,
            senha
        });

        return response;
    } catch (error) {
        console.error("Erro na autenticação do usuário:", error);
        throw error;
    }
}

export function userSignUp({ nome, email, senha, confirmarSenha }) {
    try {
        const response = api.post('/auth/register', {
            nome,
            email,
            senha,
            confirmarSenha
        });

        return response;
    } catch (error) {
        console.error("Erro ao criar conta de usuário:", error);
        throw error;
    }
}