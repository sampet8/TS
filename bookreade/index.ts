import express from "express"
import cors from "cors"
import bodyParser, { json, urlencoded} from "body-parser"
import http from "http"
import fs from "fs"
import { Book_Complete, Book_Short } from './books_data';

let bookreader
const data = fs.readFileSync("books.json")
const myJSON: Book_Short[] = JSON.parse(data.toString())

let myMap = new Map()
myJSON.forEach((book: Book_Short) => myMap.set(book.id,<Book_Short> book))
console.log(myJSON)

function createserver() {
    bookreader = express()
    bookreader.use(cors())
    bookreader.use(json())
    bookreader.use(urlencoded({extended: false}))

    http.createServer(bookreader).listen(3000, () =>{
        console.log("Running server on port 3000")
    })

    bookreader.get("/api/library/book/:id/info", (req, res) => {
        const id = req.params["id"]
        let tempid = parseInt(id)
        let book = myMap.get(tempid)
        console.log(tempid)

        if (myMap.has(tempid)) { 
            let tempbookshort: Book_Short = {
                id: book.id,
                name: book.name,
                author: book.author,
                genre: book.genre,
            }
            res.json(tempbookshort)
        } 
        else {
            res.json({id: "Book not found"})
        }  
    })

    bookreader.post("/api/library/book/:id/info", (req, res) => {
        const id = req.params["id"]
        let tempid = parseInt(id)
        let book = myMap.get(tempid)
        console.log(tempid)

        if (myMap.has(tempid)) {
            res.json(book)
        } 
        else {
            res.json({id: "Book not found"})
        }
    })
}
createserver()




