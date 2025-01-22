import type { User } from '~/types/user';

export const updateUser = async (
  id: string,
  email: string,
  name: string,
  surname: string,
  active: boolean,
  note: string,
): Promise<{ user: User; token: string }> => {
  const response = await fetchClient(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ email, name, surname, active, plainPassword: undefined, note }), // It is not possible to get plainPassword, because it does not return in GET User object
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Update user failed: ${errorText}`);
  }

  return await response.json();
};
