import type { User } from '~/types/user';

export const createUser = async (
  email: string,
  name: string,
  surname: string,
  active: boolean,
  plainPassword: string,
  note: string,
): Promise<{ user: User }> => {
  const response = await fetchClient('/api/users', {
    method: 'POST',
    body: JSON.stringify({ email, name, surname, active, plainPassword, note }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Creating user failed: ${errorText}`);
  }

  return await response.json();
};
