// eslint-disable-next-line no-use-before-define
import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from 'firebase'
import { auth } from '../config/firebase'

interface AuthProps {
  signed: boolean
  user: User
  signOut(): void
  loading: boolean
}

const AuthContext = createContext({} as AuthProps)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        switch (router.pathname) {
          case 'https://fanarvel.vercel.app/login':
            break
          case 'https://fanarvel.vercel.app/register':
            break
          default:
            router.push('/')
        }
      } else {
        switch (router.pathname) {
          case '/':
            router.push('https://fanarvel.vercel.app/dashboard')
            break
          case '/login':
            router.push('https://fanarvel.vercel.app/dashboard')
            break
          case '/register':
            router.push('https://fanarvel.vercel.app/dashboard')
            break
        }
      }
    }
  }, [router.pathname, user])

  useEffect(() => {
    auth().onAuthStateChanged((user: User) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }
    })
  }, [signOut, router.pathname])

  async function signOut() {
    await auth().signOut()
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
