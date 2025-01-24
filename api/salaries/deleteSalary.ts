export const deleteSalary = async (id: string): Promise<void> => {
  const response = await fetchClient(`/api/salary/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Deleting salary failed: ${errorText}`);
  }
};
