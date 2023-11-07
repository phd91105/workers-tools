export const ENV: any = {
  EMAIL: "fs28@mbox.re",
  PASSWORD: "@Haitam289",
  APP_KEY: "2C4ErbRVwcxmUtPTwR5uZq6Svz54JbHc",
  USER_AGENT: "FshareiOSApp-saCP7ssw2u7w",
};

export const TOKEN_KEY = "accessToken";
export const SESSION_KEY = "sessionId";

/**
 * @param {object} env
 */
export function initEnv(env: any) {
  const envValueTypes: any = {
    EMAIL: "string",
    PASSWORD: "string",
    APP_KEY: "string",
    USER_AGENT: "string",
  };

  for (const key of Object.keys(ENV)) {
    const t = envValueTypes[key] ? envValueTypes[key] : typeof ENV[key];
    if (env[key]) {
      switch (t) {
        case "number":
          ENV[key] = parseInt(env[key]) || ENV[key];
          break;
        case "boolean":
          ENV[key] = (env[key] || "false") === "true";
          break;
        case "string":
          ENV[key] = env[key];
          break;
        case "array":
          ENV[key] = env[key].split(",");
          break;
        case "object":
          if (Array.isArray(ENV[key])) {
            ENV[key] = env[key].split(",");
          } else {
            try {
              ENV[key] = JSON.parse(env[key]);
            } catch (e) {
              console.error(e);
            }
          }
          break;
        default:
          ENV[key] = env[key];
          break;
      }
    }
  }
}
