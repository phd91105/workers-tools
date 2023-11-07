/**
 * @param {number} length
 * @return {string}
 */
export function randomString(length: number): string {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

/**
 * @param {string} body
 * @return {string}
 */
export function renderHTML(body: string): string {
  return `
<html>  
  <head>
    <title>Workers HTML</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="TBXark">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
        background-color: #fff;
      }
      h1 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }
      p {
        margin-top: 0;
        margin-bottom: 1rem;
      }
      a {
        color: #007bff;
        text-decoration: none;
        background-color: transparent;
      }
      a:hover {
        color: #0056b3;
        text-decoration: underline;
      }
      strong {
        font-weight: bolder;
      }
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>
  `;
}

/**
 *
 * @param {Error} e
 * @return {string}
 */
export function errorToString(e: Error): string {
  return JSON.stringify({
    message: e.message,
    stack: e.stack,
  });
}

/**
 *
 * @param {String} text
 * @return {Response}
 */
export function makeHTMLResponse(
  text: string,
  options?: { status?: number }
): Response {
  return new Response(renderHTML(text), {
    status: options?.status ?? 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}

/**
 *
 * @param {Object} json
 * @return {Response}
 */
export function makeJSONResponse(
  json: Object,
  options?: { status?: number }
): Response {
  return new Response(JSON.stringify(json), {
    status: options?.status ?? 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
