// eslint-disable-next-line no-use-before-define
import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from 'firebase'
import { auth } from '../config/firebase'

interface AuthProps {
  signed: boolean
  user: User
  signOut(): void
}

const AuthContext = createContext({} as AuthProps)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      switch (router.pathname) {
        case '/login':
          break
        case '/register':
          break
        default:
          router.push('/')
      }
    } else {
      switch (router.pathname) {
        case '/':
          router.push('/dashboard')
          break
        case '/login':
          router.push('/dashboard')
          break
        case '/register':
          router.push('/dashboard')
          break
      }
    }
  }, [router.pathname, user])

  useEffect(() => {
    auth().onAuthStateChanged((user: User) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [signOut, router.pathname])

  async function signOut() {
    await auth().signOut()
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
