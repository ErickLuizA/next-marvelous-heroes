import { createContext, useEffect, useState } from 'react'
import {
  createMuiTheme,
  ThemeProvider as ThemeProv,
  Theme
} from '@material-ui/core'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  }
})

interface ITheme {
  theme: Theme
  toggle: () => void
}

export const ThemeContext = createContext({} as ITheme)

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme)

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme === 'light') {
      setTheme(lightTheme)
    } else {
      setTheme(darkTheme)
    }
  }, [])

  const toggle = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme)
      localStorage.setItem('theme', 'light')
    } else {
      setTheme(darkTheme)
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <ThemeProv theme={theme}>{children}</ThemeProv>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
