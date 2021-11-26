import express from "express"
import cors from "cors"
import bodyParser, { json, urlencoded} from "body-parser"
import http from "http"
import fs from "fs"
import { Book , Book_Short } from './books_data';
import { save } from './methods';

let bookreader = express()
const data = fs.readFileSync("books.json")

const myJson: Book[] = JSON.parse(data.toString())

let myMap = new Map()
myJson.forEach((book: Book_Short) => myMap.set(book.id,<Book_Short> book))
console.log(myJson)


function createNewMap() {
    const myJson: Book[] = JSON.parse(fs.readFileSync(("books.json")).toString())
    let myMap = new Map()
    myJson.forEach((book: Book_Short) => myMap.set(book.id,<Book_Short> book))
}


function createserver() {
    bookreader.use(cors())
    bookreader.use(json())
    bookreader.use(urlencoded({extended: false}))

    http.createServer(bookreader).listen(4000, () =>{
        console.log("Running server on port 4000")
    })

    bookreader.get("/api/library/book/:id/info", (req, res) => {
        createNewMap()
        const id = req.params["id"]
        let bookID = parseInt(id)
        let book = myMap.get(bookID)
        console.log(bookID)

        if (myMap.has(bookID)) { 
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
        createNewMap()
        const id = req.params["id"]
        let bookID = parseInt(id)
        let book = myMap.get(bookID)
        console.log(bookID)

        if (myMap.has(bookID)) {
            res.json(book)
        } 
        else {
            res.json({id: "Book not found"})
        }
    })

    bookreader.put("/api/library/book/:id/add" , (req, res) => {
        createNewMap();
        const id = req.params["id"]
        let bookID = parseInt(id)
        console.log(bookID)

        if (myMap.has(bookID)) {
            res.json({id: "Book not found!"})
        }
        else {
            let addBook = myJson.push({
                id: bookID,
                name: req.body["name"],
                author: req.body["author"],
                genre: req.body["genre"],
                published: req.body["published"],
                publisher: req.body["publisher"],
                country_of_origin: req.body["country_of_origin"],
                pages: req.body["pages"]
            })
            save(myJson)
            console.log(myJson)
            res.json({addBook, Response: "Book was added!"})
        }
    }
    )

    bookreader.delete("/api/library/book/:id/delete" , (req, res) => {
        createNewMap()
        const id = req.params["id"]
        let bookID = parseInt(id)
        console.log(bookID)

        if (myMap.has(bookID)) {
            let deleteJson = myJson.filter((book: Book) => book.id !== bookID)
            fs.writeFileSync("books.json", (JSON.stringify(deleteJson, null, 2)))
            res.json({ message: "Book was deleted!"})
            createNewMap()
        } else {
            res.json({id: "Book not found!"})
        }
    }
    )

}
createserver()




