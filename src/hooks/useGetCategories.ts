import React, { use } from 'react';
import useClientCredentialToken from './useClientCredentialToken';
import { useQuery } from '@tanstack/react-query';
import getCategories from '../apis/categoriesApi';

const useGetCategories = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error('No token available');
      }
      return getCategories(clientCredentialToken);
    },
  });
};

export default useGetCategories;
