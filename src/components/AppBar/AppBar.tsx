import Link from 'next/link'
import { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import styles from './AppBar.module.css'

export function AppBar() {
  const [showItems, setShowItems] = useState(false)

  const handleMenuClick = () => {
    setShowItems(true)
  }

  const handleCloseMenuClick = () => {
    setShowItems(false)
  }

  return (
    <div className={styles.container}>
      <Link href="/">
        <h1 className={styles.header}>Heroes</h1>
      </Link>

      {!showItems && (
        <MdMenu
          className={styles.menuIcon + ' lg:hidden'}
          cursor="pointer"
          size={30}
          onClick={handleMenuClick}
        />
      )}

      <div className={showItems ? styles.menu : styles.desktopMenu}>
        {showItems && (
          <MdClose
            className={styles.closeIcon}
            cursor="pointer"
            onClick={handleCloseMenuClick}
          />
        )}

        <Link href="/characters">
          <a className={styles.menuItem}>Characters</a>
        </Link>
        <Link href="/comics">
          <a className={styles.menuItem}>Comics</a>
        </Link>
        <Link href="/series">
          <a className={styles.menuItem}>Series</a>
        </Link>
        <Link href="/events">
          <a className={styles.menuItem}>Events</a>
        </Link>
        <Link href="/stories">
          <a className={styles.menuItem}>Stories</a>
        </Link>
        <Link href="/creators">
          <a className={styles.menuItem}>Creators</a>
        </Link>
      </div>
    </div>
  )
}
