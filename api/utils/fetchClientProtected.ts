type FetchClientProtectedProps = {
  method: 'GET' | 'POST' | 'UPDATE' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | null;
};

export const fetchClientProtected = (url: string, options?: FetchClientProtectedProps) => {
  const config = useRuntimeConfig();
  const jwtToken = useCookie('jwtToken');

  return fetch(config.public.apiBasePath + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken.value}`,
      ...options?.headers,
    },
    body: options?.body ?? undefined,
  });
};
