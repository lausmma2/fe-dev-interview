type FetchClientProps = {
  method: 'GET' | 'POST' | 'UPDATE' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | null;
};

export const fetchClient = (url: string, options?: FetchClientProps) => {
  const config = useRuntimeConfig();
  return fetch(config.public.apiBasePath + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ?? undefined,
  });
};
