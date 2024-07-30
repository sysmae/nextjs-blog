import ReactSelect from 'react-select/creatable'

import { MarkdownEditor } from '@/components/Markdown'
import { useState, useRef } from 'react'

import { GetServerSideProps } from 'next'
import { createClient } from '@/utils/supabase/server'

import { useRouter } from 'next/router'
import Input from '@/components/Input'

type WriteProps = {
  existingTags: string[]
  existingCategories: string[]
}

export default function Write({
  existingTags,
  existingCategories,
}: WriteProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!titleRef.current?.value || titleRef.current.value.length === 0)
      return alert('제목을 입력해주세요.')
    if (category.length === 0) return alert('카테고리를 입력해주세요.')
    if (tags.length === 0) return alert('태그를 입력해주세요.')
    if (content.length === 0) return alert('글 내용을 입력해주세요.')

    const formData = new FormData()

    formData.append('title', titleRef.current?.value ?? '')
    formData.append('category', category)
    formData.append('tags', tags)
    formData.append('content', content)

    if (fileRef.current?.files?.[0]) {
      formData.append('preview_image', fileRef.current.files[0])
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: formData,
    })

    const data = await response.json()
    if (data.id) router.push(`/posts/${data.id}`)
  }

  return (
    <div className="container mx-auto flex grow flex-col px-4 pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">새로운 글</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input type="text" placeholder="제목" ref={titleRef} />
          <Input type="file" accept="image/*" ref={fileRef} />
          <ReactSelect
            options={existingCategories.map((category) => ({
              label: category,
              value: category,
            }))}
            placeholder="카테고리"
            onChange={(e) => e && setCategory(e.value)}
            isMulti={false}
          />
          <ReactSelect
            options={existingTags.map((tag) => ({
              label: tag,
              value: tag,
            }))}
            placeholder="태그"
            onChange={(e) =>
              e && setTags(JSON.stringify(e.map((e) => e.value)))
            }
            isMulti={true}
          />
          <MarkdownEditor
            height={500}
            value={content}
            onChange={(s) => setContent(s ?? '')}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-gray-800 py-2 text-white transition-all hover:bg-gray-900"
        >
          작성하기
        </button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const supabase = createClient(req.cookies)
  const { data } = await supabase.from('Post').select('category, tags')

  const existingCategories = Array.from(new Set(data?.map((d) => d.category)))
  const existingTags = Array.from(
    new Set(
      data?.flatMap((d) => {
        return JSON.parse(d.tags)
      }),
    ),
  )

  return {
    props: {
      existingCategories,
      existingTags,
    },
  }
}
