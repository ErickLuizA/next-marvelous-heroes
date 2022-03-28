import Link from 'next/link'
import { MdOpenInFull } from 'react-icons/md'
import styles from './TextList.module.css'

interface ITextListProps {
  title: string
  expandLink: string
  items: { link: string; name: string }[]
}

export function TextList({ title, expandLink, items }: ITextListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <Link href={expandLink}>
          <a>
            <MdOpenInFull cursor="pointer" size={24} title="See more" />
          </a>
        </Link>
      </div>
      <ul className={styles.list}>
        {items.slice(0, 5).map((item) => (
          <li key={item.link}>
            <Link href={item.link}>
              <a className={styles.link}>{item.name}</a>
            </Link>
          </li>
        ))}
        {items.length === 0 ? `No ${title.toLowerCase()} found.` : ''}
      </ul>
    </div>
  )
}
