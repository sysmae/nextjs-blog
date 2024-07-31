import { GetServerSideProps } from 'next'
import PostList from '@/components/PostList'

type CategoryPostsProps = {
  category: string
}

export default function CategoryPosts({ category }: CategoryPostsProps) {
  return <PostList category={category} />
}

export const getServerSideProps: GetServerSideProps<
  CategoryPostsProps
> = async ({ query }) => {
  return {
    props: {
      category: query.category as string,
    },
  }
}
