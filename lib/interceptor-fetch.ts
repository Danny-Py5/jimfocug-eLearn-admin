export async function interceptorFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  let response = await fetch(endpoint, {
    ...options,
    credentials: "include",
  });

  if (response.status == 401) {
    // Access token expired
    const refreshResponse = await fetch("/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      return refreshResponse;
    }

    // Refresh succeeded, retry original request
    response = await fetch(endpoint, {
      ...options,
      credentials: "include",
    });

    return response;
  }

  return response;
}
