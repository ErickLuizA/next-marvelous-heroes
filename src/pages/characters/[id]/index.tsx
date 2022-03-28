import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { AppBar } from '../../../components/AppBar'
import { Container } from '../../../components/Container'
import { TextList } from '../../../components/TextList'
import * as api from '../../../services/network'
import styles from '../../../styles/detail.module.css'
import { Character as ICharacter } from '../../../types/character'
import { capitalize } from '../../../utils/string'

export default function Character({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <AppBar />
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <img
            src={data.thumbnail.path + '.' + data.thumbnail.extension}
            className={styles.img}
          />
          <div>
            <h1 className={styles.name}>{data.name}</h1>
            <p className={styles.description}>
              {data.description || 'No description found'}
            </p>
          </div>
        </div>

        <div className={styles.textList}>
          <TextList
            title="Comics"
            expandLink={`/characters/${data.id}/comics`}
            items={data.comics.items.map((item) => ({
              link: `${data.id}/comics/${item.resourceURI.split('/').pop()}`,
              name: item.name
            }))}
          />

          <TextList
            title="Stories"
            expandLink={data.id + '/stories'}
            items={data.stories.items.map((item) => ({
              link: `${data.id}/stories/${item.resourceURI.split('/').pop()}`,
              name: item.name
            }))}
          />

          <TextList
            title="Series"
            expandLink={data.id + '/series'}
            items={data.series.items.map((item) => ({
              link: `${data.id}/series/${item.resourceURI.split('/').pop()}`,
              name: item.name
            }))}
          />

          <TextList
            title="Events"
            expandLink={data.id + '/events'}
            items={data.events.items.map((item) => ({
              link: `${data.id}/events/${item.resourceURI.split('/').pop()}`,
              name: item.name
            }))}
          />
        </div>

        <div className={styles.officialList}>
          <h2>Official Links</h2>
          <ul>
            {data.urls.map((item) => (
              <li key={item.type}>
                <a href={item.url} target="_blank">
                  {capitalize(item.type)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await api.getCharacters({ limit: 100 })

  const paths = data.map((char: ICharacter) => ({
    params: { id: char.id.toString() }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<{ data: ICharacter }> = async (
  context
) => {
  const data = await api.getCharacter(Number(context.params.id))

  return {
    props: { data },
    revalidate: 60 * 60
  }
}
