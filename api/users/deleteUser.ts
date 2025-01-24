import { fetchClient } from '../utils/fetchClient';

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetchClient(`/api/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Deleting user failed: ${errorText}`);
  }
};
