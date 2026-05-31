import { getHeaderContent } from '@/services/contentApi'
import { useQuery } from '@tanstack/react-query'

export const useHeaderContent = () =>
  useQuery({
    queryKey: ['content', 'header'],
    queryFn: getHeaderContent,
    staleTime: 60_000,
  })
