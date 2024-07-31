import { GetServerSideProps } from 'next'
import PostList from '@/components/PostList'

type TagsPostsProps = {
  tag: string
}

export default function TagPosts({ tag }: TagsPostsProps) {
  return <PostList tag={tag} />
}

export const getServerSideProps: GetServerSideProps<TagsPostsProps> = async ({
  query,
}) => {
  return {
    props: {
      tag: query.tag as string,
    },
  }
}
