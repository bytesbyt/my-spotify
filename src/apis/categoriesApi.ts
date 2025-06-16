import axios from 'axios';
import React from 'react'
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { CategoriesRequest, CategoriesResponse } from '../models/categories';

const getCategories = async(
  clientCredentialToken: string,
  params?: CategoriesRequest
): Promise<CategoriesResponse> => {

  try {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.locale) queryParams.append('locale', params.locale);

    const response = await axios.get (
      `${SPOTIFY_BASE_URL}/browse/categories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

};

export default getCategories;
