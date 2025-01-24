import type { Salary } from '~/types/salary';

export const createSalary = async (
  user: string,
  money: number,
  year: string,
  month: number,
): Promise<{ salary: Salary }> => {
  const response = await fetchClient('/api/salaries', {
    method: 'POST',
    body: JSON.stringify({ user, money, year, month }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Creating salary failed: ${errorText}`);
  }

  return await response.json();
};
