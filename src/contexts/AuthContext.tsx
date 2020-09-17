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

  useEffect(() => {
    ;(async () => {
      if (!loading) {
        if (!user) {
          switch (router.pathname) {
            case '/login':
              break
            case '/register':
              break
            default:
              await router.push('/')
          }
        } else {
          switch (router.pathname) {
            case '/':
              await router.push('/dashboard')
              break
            case '/login':
              await router.push('/dashboard')
              break
            case '/register':
              await router.push('/dashboard')
              break
          }
        }
      }
    })()
  })

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
