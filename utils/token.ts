export const storeToken = (token: string) => {
  document.cookie = `jwtToken=${token}; path=/; max-age=${7 * 24 * 60 * 60};`;
};
