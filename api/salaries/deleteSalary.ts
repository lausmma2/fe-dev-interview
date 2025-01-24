import { fetchClientProtected } from '../utils/fetchClientProtected';

export const deleteSalary = async (id: string): Promise<void> => {
  const response = await fetchClientProtected(`/api/salary/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Deleting salary failed: ${errorText}`);
  }
};
