import { JSDOM } from "jsdom"

/**
 * allows you to find all genres
 * @param data
 * @return Array<{ title: string; value: string}>
 */
export const genreScraping = (data: string) => {
  const dom = new JSDOM(data)
  const query = dom.window.document.querySelectorAll("div.category > a")
  const genres: Array<{ title: string; value: string }> = []

  for (let i = 0; i < query.length; i++) {
    const aTag = query.item(i)
    const path = (aTag as any).href
    const genreName = (aTag.children?.[0].innerHTML || "").replace(/&amp;/g, "&").replace(/\n/g, "")
    genres.push({ value: path, title: genreName })
  }
  if (genres.length <= 0) throw new Error("There is no values matched with class:category, try to use a a valid class name")
  return genres
}

/**
 * allows you to find winning book
 * @param data
 * @returns string
 */
export const booksScraping = (data: string): string => {
  const dom = new JSDOM(data)
  const query = dom.window.document.querySelectorAll("a.winningTitle")
  if (query.length <= 0) throw new Error("There is no values matched with class:winningTitle, try to use a a valid class name")
  const nodeValue = query.item(0)
  return nodeValue.innerHTML.toLowerCase()
}
