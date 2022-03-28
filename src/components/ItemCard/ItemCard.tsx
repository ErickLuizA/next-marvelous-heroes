import Link from 'next/link'
import { Item } from '../../types/item'
import styles from './ItemCard.module.css'

interface IItemCardProps {
  item: Item
  link: string
  marginRight?: boolean
  scale?: boolean
}

export function ItemCard({
  item: { poster, title },
  link,
  marginRight = false,
  scale = false
}: IItemCardProps) {
  const className =
    (marginRight
      ? styles.marginRight + ' ' + styles.listItem
      : styles.listItem) + (scale ? ' ' + styles.scale : '')

  return (
    <li className={className}>
      <Link href={link}>
        <a>
          <img src={poster} alt={title} className={styles.img} />
          <p>
            {title.slice(0, 30)} {title.length > 30 ? '...' : ''}
          </p>
        </a>
      </Link>
    </li>
  )
}
