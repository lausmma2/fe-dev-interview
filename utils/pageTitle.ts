import { useHead, useState } from '#imports';

export const setPageTitle = (title: string) => {
  const pageTitle = useState('pageTitle', () => title);
  pageTitle.value = title;
  useHead({ title });
};
