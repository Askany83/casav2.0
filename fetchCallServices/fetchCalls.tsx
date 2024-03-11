interface RequestOptions {
  method: string;
  body?: BodyInit | null;
  headers?: HeadersInit;
}

async function request(
  url: string,
  options: RequestOptions = { method: "GET" }
) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function get<T>(
  url: string,
  options?: RequestOptions
): Promise<T> {
  return request(url, { ...options, method: "GET" });
}

export async function post<T>(
  url: string,
  data: any,
  options?: RequestOptions
): Promise<T> {
  return request(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function del<T>(
  url: string,
  options?: RequestOptions
): Promise<T> {
  return request(url, { ...options, method: "DELETE" });
}

export async function patch<T>(
  url: string,
  data: any,
  options?: RequestOptions
): Promise<T> {
  return request(url, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function put<T>(
  url: string,
  data: any,
  options?: RequestOptions
): Promise<T> {
  return request(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
}
