/**
 * Makes a request to a given URL with the provided options.
 *
 * @param url - The URL to make the request to
 * @param options - The options for the request like method, headers, body etc.
 * @returns The JSON response from the request
 */

import { DeleteResponse } from "@/interfaces/interfaces";

// Define a set of options for the request
interface RequestOptions {
  method: string; // HTTP method such as GET, POST, DELETE, etc.
  body?: BodyInit | null; // Request body, if applicable
  headers?: HeadersInit; // Request headers
}

// Async function to make a request to a given URL with provided options
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

// Async function to send a GET request to a URL and return response as type T
export async function get<T>(
  url: string,
  options?: RequestOptions
): Promise<T> {
  return request(url, { ...options, method: "GET" });
}

// Async function to send a POST request to a URL with data and return response as type T
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

// export async function post<T>(
//   url: string,
//   formData: FormData,
//   options?: RequestOptions
// ): Promise<T> {
//   return request(url, {
//     ...options,
//     method: "POST",
//     body: formData,
//   });
// }
// // Send POST request with FormData
// const response = await post<ResponseType>(url, formData);

// Async function to send a DELETE request to a URL and return response as type T or DeleteResponse
export async function del<T>(
  url: string,
  options?: RequestOptions
): Promise<T | DeleteResponse> {
  return request(url, { ...options, method: "DELETE" });
}

// Async function to send a PATCH request to a URL with data and return response as type T
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

// Async function to send a PUT request to a URL with data and return response as type T
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
