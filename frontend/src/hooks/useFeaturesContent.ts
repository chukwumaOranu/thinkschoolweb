import { getFeatureContent, getFeaturesContent } from '@/services/contentApi'
import { useQuery } from '@tanstack/react-query'

export const useFeaturesContent = () =>
  useQuery({
    queryKey: ['content', 'features'],
    queryFn: getFeaturesContent,
    staleTime: 60_000,
  })

export const useFeatureContent = (slug: string) =>
  useQuery({
    queryKey: ['content', 'features', slug],
    queryFn: () => getFeatureContent(slug),
    enabled: Boolean(slug),
    staleTime: 60_000,
  })
