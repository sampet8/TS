import { Book_Short , Book } from './books_data';
import * as fs from "fs";


/**
 * Creates new map
 */
export function createNewMap() {
    //defines myJson and provides updates of myMap
    const myJson: Book[] = JSON.parse(fs.readFileSync(("books.json")).toString())
    let myMap = new Map()
    myJson.forEach((book: Book_Short) => myMap.set(book.id,<Book_Short> book))
}

/**
 * Saves books
 * @param books object we are saving
 */
export function saveBooks(books: Book[]){
    fs.writeFileSync("books.json", (JSON.stringify(books, null, 2)))
}

/**
 * Searches author
 * @param author string parameter for an author of the book
 * @param book  parameter for the object in which we are looking for data 
 * @returns book - object containing data
 */
export function searchAuthor(author: string, book: Book) {
    for(let i = 0; i < book.author.length; i++){
        if(book.author[i].toLowerCase().includes(author.toLowerCase())){
            return book
        }
    }
}

/**
 * Searches name
 * @param name string parameter for a name of the book
 * @param book parameter for the object in which we are looking for data 
 * @returns  book - object containing data
 */
export function searchName(name: string, book: Book){
    for(let i = 0; i < book.name.length; i++){
        if(book.name[i].toLowerCase().includes(name.toLowerCase())){
            return book
        }
    }
}