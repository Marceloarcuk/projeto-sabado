// src/contexts/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'

// Criar o contexto
const UserContext = createContext()

// Função que serve para acessar o contexto de forma simples
export const useUser = () => useContext(UserContext)

// Criar o Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // Função para fazer login (salva as informações do usuário)
    const login = (userData) => {
        setUser(userData)
        // Você pode também salvar o token em LocalStorage ou algo do tipo
        localStorage.setItem('user', JSON.stringify(userData))
    }

    // Função para fazer logout (limpa as informações do usuário)
    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    // Recuperar usuário do LocalStorage ao iniciar a aplicação
    const loadUserFromLocalStorage = () => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }

    // Chama a função para carregar o usuário do LocalStorage assim que o provider for montado
    useEffect(() => {
        loadUserFromLocalStorage()
    }, [])

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}
