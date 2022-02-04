import axios from "axios"

const client = axios.create({
  baseURL: "https://www.goodreads.com",
})

/**
 * allows you to fetch resource
 * @param path
 * @returns promise
 */
export const fetch = async (path: string) => {
  return client.get(path)
}
