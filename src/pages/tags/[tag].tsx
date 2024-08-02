import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import PostList from '@/components/PostList'
import { createClient } from '@/utils/supabase/server'
import { Post } from '@/types'

type TagsPostsProps = {
  tag: string
  posts: Post[]
}

const supabase = createClient({})

export const getStaticPaths = (async () => {
  const { data } = await supabase.from('Post').select('tags')
  const tags = Array.from(
    new Set(
      data?.flatMap((d) => {
        return JSON.parse(d.tags)
      }),
    ),
  )

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: 'blocking',
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const tag = context.params?.tag as string
  const { data } = await supabase
    .from('Post')
    .select('*')
    .like('tags', `%${tag}%`)
  return {
    props: {
      tag: context.params?.tag as string,
      posts:
        data?.map((post) => ({
          ...post,
          tags: JSON.parse(post.tags) as string[],
        })) ?? [],
    },
  }
}) satisfies GetStaticProps<TagsPostsProps>

export default function TagPosts({ tag }: TagsPostsProps) {
  return <PostList tag={tag} />
}
