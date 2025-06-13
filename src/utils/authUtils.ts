import { NavigateFunction } from 'react-router';
import { renderUnauthorizedError } from "../layout/components/UnauthorizedError";

const AUTH_STORAGE_KEYS = [
  'access_token',
  'refresh_token',
  'user_data',
  'code_verifier',
];

export const handleLogout = () => {
  console.log('Initiating logout...');

  try {
    AUTH_STORAGE_KEYS.forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('An error occurred during logout:', error);
  }
};