const isDev = process?.env.NODE_ENV === "development";
const localStorage = typeof window !== "undefined" ? window.localStorage : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debugLogger = (...optionalParams: any[]) => {
  if (!isDev && localStorage && localStorage.getItem("debug") !== "true") {
    return;
  }

  console.log(...optionalParams);
};
