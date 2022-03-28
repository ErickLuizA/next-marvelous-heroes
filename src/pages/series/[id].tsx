import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Container } from '../../components/Container'
import { AppBar } from '../../components/AppBar'
import * as api from '../../services/network'
import { Serie as ISerie } from '../../types/serie'
import styles from '../../styles/detail.module.css'
import { TextList } from '../../components/TextList'
import { capitalize } from '../../utils/string'

export default function Serie({
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
            <h1 className={styles.name}>{data.title}</h1>
            <p className={styles.description}>
              {data.description || 'No description found'}
            </p>
          </div>
        </div>

        <div className={styles.textList}>
          <TextList
            title="Characters"
            expandLink={data.id + '/characters'}
            items={data.characters.items.map((item) => ({
              link: `${data.id}/characters/${item.resourceURI
                .split('/')
                .pop()}`,
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
            title="Events"
            expandLink={data.id + '/events'}
            items={data.events.items.map((item) => ({
              link: `${data.id}/events/${item.resourceURI.split('/').pop()}`,
              name: item.name
            }))}
          />

          <TextList
            title="Creators"
            expandLink={data.id + '/creators'}
            items={data.creators.items.map((item) => ({
              link: `${data.id}/creators/${item.resourceURI.split('/').pop()}`,
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
  const data = await api.getSeries({ limit: 100 })

  const paths = data.map((item: ISerie) => ({
    params: { id: item.id.toString() }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<{ data: ISerie }> = async (
  context
) => {
  const data = await api.getSerie(Number(context.params.id))

  return {
    props: { data },
    revalidate: 60 * 60
  }
}
