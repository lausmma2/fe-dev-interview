import type { User } from '~/types/user';

export const getUsers = async (): Promise<{ items: User[] }> => {
  const response = await fetch('https://interview-test.digital.cz/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};
