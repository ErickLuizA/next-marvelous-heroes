import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TextField, Button, makeStyles, Container } from '@material-ui/core'

import { auth } from '../config/firebase'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '75%'
  },

  flex: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
}))

interface FormProps {
  type: string
}

const Form: React.FC<FormProps> = ({ type }) => {
  const styles = useStyles()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState({
    isError: false,
    emailMessage: '',
    passwordMessage: ''
  })

  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError({ isError: false, emailMessage: '', passwordMessage: '' })

    if (type === 'Register') {
      try {
        const user = await auth().createUserWithEmailAndPassword(
          email,
          password
        )

        await user.user.updateProfile({
          displayName: name
        })

        router.push('/dashboard')
      } catch (error) {
        console.log(error)
        if (/email/.test(error.code)) {
          setError({
            isError: true,
            emailMessage: error.message,
            passwordMessage: ''
          })
        } else if (/password/.test(error.code)) {
          setError({
            isError: true,
            emailMessage: '',
            passwordMessage: error.message
          })
        } else {
          setError({
            isError: true,
            emailMessage: error.message,
            passwordMessage: error.message
          })
        }
      }
    } else {
      try {
        await auth().signInWithEmailAndPassword(email, password)

        router.push('/dashboard')
      } catch (error) {
        console.log(error)
        if (/email/.test(error.code)) {
          setError({
            isError: true,
            emailMessage: error.message,
            passwordMessage: ''
          })
        } else if (/password/.test(error.code)) {
          setError({
            isError: true,
            emailMessage: '',
            passwordMessage: error.message
          })
        } else {
          setError({
            isError: true,
            emailMessage: error.message,
            passwordMessage: error.message
          })
        }
      }
    }
  }

  async function handleGoogleLogin() {
    setError({ isError: false, emailMessage: '', passwordMessage: '' })
    try {
      const provider = new auth.GoogleAuthProvider()

      await auth().signInWithPopup(provider)

      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container maxWidth="md" className={styles.container}>
      <Button color="secondary" variant="outlined" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
      <form onSubmit={handleSubmit} className={styles.flex}>
        {type === 'Register' && (
          <TextField
            required
            error={error.isError}
            margin="dense"
            label="Username"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <TextField
          required
          error={error.isError}
          margin="dense"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          helperText={error.isError && error.emailMessage}
        />
        <TextField
          required
          error={error.isError}
          margin="dense"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          helperText={error.isError && error.passwordMessage}
        />
        <Button variant="contained" type="submit" style={{ marginTop: '25px' }}>
          {type}
        </Button>
      </form>
    </Container>
  )
}

export default Form
