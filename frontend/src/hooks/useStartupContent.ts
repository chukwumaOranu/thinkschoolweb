import { getStartupContent } from '@/services/contentApi'
import { useQuery } from '@tanstack/react-query'

export const useStartupContent = () =>
  useQuery({
    queryKey: ['content', 'startup'],
    queryFn: getStartupContent,
    staleTime: 60_000,
  })
