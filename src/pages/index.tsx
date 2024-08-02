import PostList from '@/components/PostList'
import { Post } from '@/types'
import { GetStaticProps } from 'next'
import { createClient } from '@/utils/supabase/server'

export const getStaticProps = (async () => {
  const supabase = createClient({})
  const { data } = await supabase.from('Post').select('*')

  return {
    props: {
      posts:
        data?.map((post) => ({
          ...post,
          tags: JSON.parse(post.tags) as string[],
        })) ?? [],
    },
  }
}) satisfies GetStaticProps<{
  posts: Post[]
}>

export default function Home() {
  return <PostList />
}
