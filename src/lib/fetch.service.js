const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/+$/, "");

let forbiddenHandler = null;
let forbiddenHandlerPromise = null;

const buildHeaders = (headers = {}) => {
  const nextHeaders = new Headers(headers);
  return nextHeaders;
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
};

const buildError = async (response) => {
  const payload = await parseResponse(response);
  const message =
    payload?.message ||
    payload?.error ||
    payload?.details ||
    `Request failed with status ${response.status}`;

  const error = new Error(message);
  error.status = response.status;
  error.payload = payload;
  return error;
};

const handleForbiddenResponse = async () => {
  if (!forbiddenHandler) return;

  if (!forbiddenHandlerPromise) {
    forbiddenHandlerPromise = Promise.resolve(forbiddenHandler()).finally(() => {
      forbiddenHandlerPromise = null;
    });
  }

  await forbiddenHandlerPromise;
};

export const fetchService = {
  async request(path, options = {}) {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      ...options,
      headers: isFormData ? undefined : buildHeaders(options.headers),
    });

    if (!response.ok) {
      if (response.status === 403) {
        await handleForbiddenResponse();
      }

      throw await buildError(response);
    }

    return parseResponse(response);
  },

  get(path, options = {}) {
    return this.request(path, {
      ...options,
      method: "GET",
    });
  },

  post(path, body, options = {}) {
    const headers = buildHeaders(options.headers);

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return this.request(path, {
      ...options,
      method: "POST",
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },

  patch(path, body, options = {}) {
    const headers = buildHeaders(options.headers);

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return this.request(path, {
      ...options,
      method: "PATCH",
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },

  put(path, body, options = {}) {
    const headers = buildHeaders(options.headers);

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return this.request(path, {
      ...options,
      method: "PUT",
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },

  delete(path, options = {}) {
    return this.request(path, {
      ...options,
      method: "DELETE",
    });
  },
};

export const setForbiddenHandler = (handler) => {
  forbiddenHandler = typeof handler === "function" ? handler : null;
};

export { API_BASE_URL };
