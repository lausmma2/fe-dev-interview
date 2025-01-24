import type { Salary } from '~/types/salary';

export const getSalaries = async (): Promise<{ items: Salary[] }> => {
  const response = await fetchClient('/api/salaries');

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch salaries: ${errorText}`);
  }

  return await response.json();
};
