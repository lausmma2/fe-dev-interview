import type { User } from '~/types/user';

export const login = async (
  email: string,
  password: string,
): Promise<{ user: User; token: string }> => {
  const response = await fetchClient('/api/auth-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${errorText}`);
  }

  return await response.json();
};
