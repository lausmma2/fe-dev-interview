import { fetchClient } from '../utils/fetchClient';
import type { User } from '~/types/user';

export const updateUser = async (
  id: string,
  email: string,
  name: string,
  surname: string,
  active: boolean,
  plainPassword: string,
  note: string,
): Promise<{ user: User }> => {
  const response = await fetchClient(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ email, name, surname, active, plainPassword, note }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Update user failed: ${errorText}`);
  }

  return await response.json();
};
