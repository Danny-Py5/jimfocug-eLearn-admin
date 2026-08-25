import { cookies } from "next/headers";

export async function interceptorFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  //   console.log("fetching original data...");

  let response = await fetch(endpoint, {
    ...options,
  });

  console.log("origin response status:", response.status);
  console.log("original response: ", await response.clone().json());

  if (response.status === 401) {
    console.log("Attempting refresh...");
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      //   console.log("No refresh token available");
      return response;
    }
    const refreshResponse = await fetch(
      `${process.env.CLIENT_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      },
    );

    // console.log("refresh response:", refreshResponse.status);
    // console.log("Refresh successful:", await refreshResponse.clone().json());

    if (!refreshResponse.ok) {
      console.log("Refresh failed:", await refreshResponse.clone().json());
      return response;
    }
    console.log("Token refreshed");

    // Retry original request        ====||====       extract the new token
    const refreshData: { accessToken: string } = await refreshResponse.json();
    if (!refreshResponse.ok) {
      console.log("Refresh failed:", refreshData);
      return response;
    }

    // console.log("Token refreshed:", refreshData.accessToken);

    const newAccessToken = refreshData.accessToken;
    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${newAccessToken}`);

    response = await fetch(endpoint, {
      ...options,
      headers,
    });
  }

  return response;
}
