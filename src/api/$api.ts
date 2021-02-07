/* eslint-disable */
import { AspidaClient, dataToURLString } from 'aspida'
import { Methods as Methods0 } from './v1/blogs'
import { Methods as Methods1 } from './v1/blogs/_id@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/v1/blogs'
  const GET = 'GET'

  return {
    v1: {
      blogs: {
        _id: (val2: string) => {
          const prefix2 = `${PATH0}/${val2}`

          return {
            get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
              fetch<Methods1['get']['resBody']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
              fetch<Methods1['get']['resBody']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        },
        get: (option?: { query?: Methods0['get']['query'], config?: T }) =>
          fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
        $get: (option?: { query?: Methods0['get']['query'], config?: T }) =>
          fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
          `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
