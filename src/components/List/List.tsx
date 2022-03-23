import Link from 'next/link'
import { useRef } from 'react'
import { MdChevronLeft, MdChevronRight, MdOpenInFull } from 'react-icons/md'
import { Item } from '../../types/item'
import { ItemCard } from '../ItemCard'
import styles from './List.module.css'

interface IListProps {
  name: string
  link: string
  items: Item[]
}

export function List({ name, link, items }: IListProps) {
  const listRef = useRef<HTMLUListElement>()

  function scrollRight() {
    listRef.current.scrollTo({
      left: listRef.current.scrollLeft + 400,
      behavior: 'smooth'
    })
  }

  function scrollLeft() {
    listRef.current.scrollTo({
      left: listRef.current.scrollLeft - 400,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h2 className={styles.header}>{name}</h2>

        <Link href={link}>
          <a>
            <MdOpenInFull
              size={24}
              className={styles.openFullIcon}
              title="See All"
            />
          </a>
        </Link>
      </div>

      <div className={styles.listContainer}>
        <button className={styles.iconButton} onClick={scrollLeft}>
          <MdChevronLeft className={styles.icon} />
        </button>

        <ul className={styles.list} ref={listRef}>
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              link={link + '/' + item.id}
              marginRight
            />
          ))}
        </ul>

        <button
          className={styles.iconButton + ' ' + styles.leftIcon}
          onClick={scrollRight}
        >
          <MdChevronRight className={styles.icon} />
        </button>
      </div>
    </div>
  )
}
