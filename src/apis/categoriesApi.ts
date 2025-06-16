import axios from 'axios';
import React from 'react'
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { CategoriesRequest, CategoriesResponse } from '../models/categories';

const getCategories = async(clientCredentialToken: string): Promise<CategoriesResponse> => {
  try {
      const response = await axios.get (`${SPOTIFY_BASE_URL}/browse/categories`,
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

export default getCategories
