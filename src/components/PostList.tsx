'use client'

import { Post } from '@/types'
import { cn } from '@/utils/style'
import { createClient } from '@/utils/supabase/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import PostCard from './PostCard'

const supabase = createClient()

type PostListProps = {
  category?: string
  tag?: string
  className?: string
}

const PostList: FC<PostListProps> = ({ category, tag, className }) => {
  const { ref, inView } = useInView()
  const {
    data: postPages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
      let request = supabase.from('Post').select('*')
      if (category) request = request.eq('category', category)
      if (tag) request = request.like('tags', `%${tag}%`)

      const { data, error } = await request
        .order('created_at', { ascending: false })
        .range(pageParam, pageParam + 5)
      if (error) {
        console.error('Error fetching posts:', error)
        return {
          posts: [],
          nextPage: null,
        }
      }
      return {
        posts: data,
        nextPage: data.length === 6 ? pageParam + 6 : null,
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <div className={cn('flex flex-col items-center gap-8 pt-20', className)}>
      <h1 className={cn('text-2xl font-medium', !category && !tag && 'hidden')}>
        {category ? category : `#${tag}`}
      </h1>
      <div className="container grid grid-cols-2 gap-x-4 gap-y-6 pb-24 lg:gap-x-7 lg:gap-y-12">
        {postPages?.pages
          .flatMap((page) => page.posts)
          .map((post) => <PostCard key={post.id} {...post} />)}
      </div>
      <div ref={ref} />
    </div>
  )
}

export default PostList
