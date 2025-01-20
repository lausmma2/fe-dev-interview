import type { User } from '~/types/user';

export const getUsers = async (): Promise<{ items: User[] }> => {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.apiBasePath}/api/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};
