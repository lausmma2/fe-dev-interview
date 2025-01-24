import { fetchClient } from '../utils/fetchClient';
import type { User } from '~/types/user';

export const getUsers = async (): Promise<{ items: User[] }> => {
  const response = await fetchClient('/api/users');

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch users: ${errorText}`);
  }

  return await response.json();
};
