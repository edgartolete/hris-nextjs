const config = {
  baseURL: process.env.NEXT_PUBLIC_API,
}

export function generateApiURL(url: string) {
  return `${config.baseURL}${url}`
}
