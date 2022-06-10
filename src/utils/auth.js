import React, { useState, useEffect, useContext, createContext } from 'react'
import { firebaseAuth } from './firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as signOutFirebase,
  updateProfile
} from 'firebase/auth'

const AuthContext = createContext()

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
      setUser(user)
      setLoading(false)
      return user
    } else {
      setUser(false)
      setLoading(false)
      return false
    }
  }

  async function createUser({ name, email, password }) {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
      await updateProfile(userCredential.user, { displayName: name })
      return handleUser(userCredential.user)
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      })
    }

  }

  async function signIn({ email, password }) {
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
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      handleUser(user)
    });
    return unsubscribe
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
  }
}
