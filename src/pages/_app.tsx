// eslint-disable-next-line no-use-before-define
import React from 'react'
import { AppProps } from 'next/app'
import CssBaseLine from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import ThemeProvider from '../contexts/ThemeContext'
import '../styles/global.css'
import { AuthProvider } from '../contexts/AuthContext'

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
