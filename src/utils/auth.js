import React, { useState, useEffect, useContext, createContext } from 'react'
import firebaseApp from './firebaseConfig'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as signOutFirebase
} from 'firebase/auth'

const AuthContext = createContext()
const firebaseAuth = getAuth(firebaseApp)

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext')
  }
  return context
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      setLoading(false)
      setUser(user)
      return user
    } else {
      setLoading(false)
      setUser(false)
      return false
    }
  }

  async function createUser(email, password) {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
      return handleUser(userCredential.user)
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      })
    }

  }

  async function signIn(email, password) {
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
      return handleUser(userCredential.user)
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      })
    }
  }

  async function signOut() {
    await signOutFirebase(firebaseAuth)
    return handleUser(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    error,
    createUser,
    signIn,
    signOut,
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}
