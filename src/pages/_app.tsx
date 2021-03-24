import { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseLine from '@material-ui/core/CssBaseline'

import { AuthProvider } from '../contexts/AuthContext'
import ThemeProvider from '../contexts/ThemeContext'

import '../styles/global.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Head>
          <title> Fanarvel </title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <CssBaseLine />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
