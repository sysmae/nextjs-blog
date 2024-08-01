import dynamic from 'next/dynamic'

const DynamicSearchPage = dynamic(() => import('@/components/SearchPage'), {
  ssr: false,
})

export default function Search() {
  return <DynamicSearchPage />
}
