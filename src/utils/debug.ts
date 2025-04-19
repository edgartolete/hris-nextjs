const development = process.env.NODE_ENV === 'development'

const localStorage = typeof window !== 'undefined' ? window.localStorage : null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...optionalParams: any[]) => {
  if (development || (localStorage && localStorage.getItem('debug') === 'true')) {
    console.log(...optionalParams)
  }
}

export const debug = { log }
