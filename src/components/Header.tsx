// eslint-disable-next-line no-use-before-define
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  MenuItem,
  Menu,
  Box,
  Container,
  Avatar
} from '@material-ui/core'
import {
  BrightnessHigh,
  Brightness4,
  Menu as MenuIcon,
  AccountCircle
} from '@material-ui/icons'
import { ThemeContext } from '../contexts/ThemeContext'
import { AuthContext } from '../contexts/AuthContext'
import Head from 'next/head'

const useStyles = makeStyles(theme => ({
  title: {
    cursor: 'pointer',
    flexGrow: 1,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'auto'
    }
  },

  burguerMenu: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },

  links: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

  toolbar: {
    paddingRight: 0,
    paddingLeft: 0
  }
}))

const Header: React.FC = () => {
  const styles = useStyles()

  const { signed, signOut, user } = useContext(AuthContext)

  const { theme, toggle } = useContext(ThemeContext)

  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
      <AppBar color="inherit" position="sticky">
        <Container maxWidth="lg">
          <Toolbar className={styles.toolbar}>
            <Box className={styles.burguerMenu}>
              <Button onClick={handleOpenMenu}>
                <MenuIcon />
              </Button>
              <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
              >
                <MenuItem>
                  <IconButton onClick={toggle}>
                    {theme.palette.type === 'dark' ? (
                      <BrightnessHigh />
                    ) : (
                      <Brightness4 />
                    )}
                  </IconButton>
                </MenuItem>
                {signed ? (
                  <div>
                    <MenuItem>
                      <Link href="/profile">
                        <a>
                          <Typography color="textPrimary">Profile</Typography>
                        </a>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem>
                      <Link href="/login">
                        <Button color="inherit">
                          <a>Login</a>
                        </Button>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/register">
                        <Button color="inherit">
                          <a>Register</a>
                        </Button>
                      </Link>
                    </MenuItem>
                  </div>
                )}
              </Menu>
            </Box>
            <Link href={signed ? '/dashboard' : '/'}>
              <Typography
                variant="h3"
                color="secondary"
                className={styles.title}
              >
                <a>Fanarvel</a>
              </Typography>
            </Link>
            <Box className={styles.links}>
              <IconButton onClick={toggle}>
                {theme.palette.type === 'dark' ? (
                  <BrightnessHigh />
                ) : (
                  <Brightness4 />
                )}
              </IconButton>

              {signed ? (
                <>
                  <IconButton onClick={handleOpenUserMenu}>
                    {user?.photoURL ? (
                      <Avatar alt={user?.displayName} src={user?.photoURL} />
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                  <Menu
                    open={Boolean(anchorElUser)}
                    anchorEl={anchorElUser}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem>
                      <Link href="/profile">
                        <a>
                          <Typography color="textPrimary">Profile</Typography>
                        </a>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button color="inherit">
                      <a>Login</a>
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button color="inherit">
                      <a>Register</a>
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  )
}

export default Header
