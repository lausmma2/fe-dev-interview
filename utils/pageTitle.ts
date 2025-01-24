export const setPageTitle = (title: string) => {
  const pageTitle = useState('pageTitle', () => title);
  pageTitle.value = title;
  useHead({ title });
};
