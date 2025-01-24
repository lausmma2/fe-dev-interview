import { fetchClientProtected } from '../utils/fetchClientProtected';
import type { Salary } from '~/types/salary';

export const updateSalary = async (
  id: string,
  user: string,
  money: number,
  year: string,
  month: number,
): Promise<{ user: Salary }> => {
  const response = await fetchClientProtected(`/api/salaries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ user, money, year, month }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Update salary failed: ${errorText}`);
  }

  return await response.json();
};
