import express from "express"
import cors from "cors"
import bodyParser, { json, urlencoded} from "body-parser"
import http from "http"
import fs from "fs"
import { Book , Book_Short } from './books_data';
import { save } from './methods';

let bookreader = express()
const data = fs.readFileSync("books.json")

const myJSON: Book[] = JSON.parse(data.toString())

let myMap = new Map()
myJSON.forEach((book: Book_Short) => myMap.set(book.id,<Book_Short> book))
console.log(myJSON)


function createNewMap() {
    const myJSON: Book[] = JSON.parse(fs.readFileSync(("books.json")).toString())
    let myMap = new Map()
    myJSON.forEach((book: Book_Short) => myMap.set(book.id,<Book_Short> book))
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
        createNewMap()
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

    bookreader.put("/api/library/book/:id/add" , (req, res) => {
        createNewMap();
        const id = req.params["id"]
        let tempid = parseInt(id)

        if (myMap.has(tempid)) {
            res.json({id: "Book not found!"})
        }
        else {

            let addBook = myJSON.push({
                id: tempid,
                name: req.body["name"],
                author: req.body["author"],
                genre: req.body["genre"],
                published: req.body["published"],
                publisher: req.body["publisher"],
                country_of_origin: req.body["country_of_origin"],
                pages: req.body["pages"]

            })
            save(myJSON)
            console.log(myJSON)
            res.json(addBook)
            res.json({Response: "Book was added!"})
            

        }
    }
    )

    bookreader.delete("/api/library/book/:id/delete" , (req, res) => {
        createNewMap()
        const id = req.params["id"]
        let tempid = parseInt(id)
        console.log(tempid)

        if (myMap.has(tempid)) {
            let deleteJSON = myJSON.filter((book: Book) => book.id !== tempid)
            fs.writeFileSync("books.json", (JSON.stringify(deleteJSON, null, 2)))
            res.json({ message: "Book was deleted!"})
            createNewMap()
        } else {
            res.json({id: "Book not found!"})
        }
    }
    )

}
createserver()




