import prompts from "prompts"
import Browser from "./libs/browser"
import { fetch } from "./libs/fetch"
import { genreScraping, booksScraping } from "./libs/scrapers"

// Note => I just created this task with the basic requirements coz it should
// be a prove of concept and we can improve it by :-
// 1- add more error handling
// 2- the page of buy button not always has buy button coz the book might be free
// 3- the functions should be more generic to apply single responsibility and i
// am talking about the Browser one
// 4- functions documentation not very good but it's a prove of connect
// 5- readme as well need some improvement
const main = async () => {
  try {
    console.log("Fetching the genres...")
    const { data: genresHtml } = await fetch("/choiceawards/best-books-2020")
    const genres = genreScraping(genresHtml)
    const response = await prompts({ type: "select", name: "value", message: "select a book's genre?", choices: genres })
    console.log("Fetching a book...")
    const { data: booksHtml } = await fetch(response.value)
    const bookName = booksScraping(booksHtml)
    const browser = new Browser("https://www.amazon.com/")
    console.log("Opening the browser...")
    await browser.open()
    console.log("Searching a book...")
    await browser.search(bookName)
    console.log("Finding the best seller...")
    await browser.findAndSelectTheBest()
    console.log("Redirecting to checkout page...")
    await browser.buyItem()
  } catch (error) {
    console.log("something went wrong...")
    console.log(`Error Message: ${error.message}`)
  }
}

main()
