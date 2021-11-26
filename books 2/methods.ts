import { Book_Short, Book } from './books_data';
import * as fs from "fs";

export function save(books: Book[]){
    fs.writeFileSync("books.json", (JSON.stringify(books, null, 2)))
}
