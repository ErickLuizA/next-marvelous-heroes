import Link from 'next/link'
import { Item } from '../../types/item'
import styles from './ItemCard.module.css'

interface IItemCardProps {
  item: Item
  link: string
  marginRight?: boolean
}

export function ItemCard({
  item: { poster, title },
  link,
  marginRight = false
}: IItemCardProps) {
  return (
    <li
      className={
        marginRight
          ? styles.marginRight + ' ' + styles.listItem
          : styles.listItem
      }
    >
      <Link href={link}>
        <a>
          <img src={poster} alt={title} className={styles.img} />
          <p>{title}</p>
        </a>
      </Link>
    </li>
  )
}
