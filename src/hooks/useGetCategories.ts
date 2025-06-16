import React, { use } from 'react';
import useClientCredentialToken from './useClientCredentialToken';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import getCategories from '../apis/categoriesApi';
import { CategoriesResponse } from '../models/categories';

const useGetCategories = () => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ['categories'],
    queryFn: async ({pageParam = 0}) => {
      if (!clientCredentialToken) {
        throw new Error('No token available');
      }
      return getCategories(clientCredentialToken, {offset: pageParam});
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CategoriesResponse) => {
        if (lastPage.categories.next) {
            const url = new URL (lastPage.categories.next);
            const nextOffset = url.searchParams.get('offset');
            return nextOffset ? parseInt(nextOffset) : undefined;
        }
        return undefined;
    },
    enabled: !!clientCredentialToken,

  });
};

export default useGetCategories;
