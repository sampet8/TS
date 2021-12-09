import express from "express"
import cors from "cors"
import bodyParser, { json, urlencoded} from "body-parser"
import http from "http"
import fs from "fs"
import { Book , Book_Short } from './books_data';
import { createNewMap , saveBooks , searchAuthor , searchName } from './methods';

let bookreader = express()
const data = fs.readFileSync("books.json")

const myJson: Book[] = JSON.parse(data.toString())

let myMap = new Map()
myJson.forEach((book: Book_Short) => myMap.set(book.id,<Book_Short> book))
console.log(myJson)

//this function creates server
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


        //this if else condition returns tempbookshort variable if bookID is found in myMap
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

     //this if else condition returns book if bookID is found in myMap        
        if (myMap.has(bookID)) {
            res.json(book)
        } 
        else {
            res.json({id: "Book not found"})
        }
    })

    bookreader.post("/api/library/book/find/author", (req, res) => {
        createNewMap()
        //this author constant requires "author" from body
        const author = req.body["author"]
        //this resAuthor constant fiters books from myJson with searchAuthor function
        const resAuthor: Book[] = myJson.filter(book => searchAuthor(author, book)) 
        res.json(resAuthor)
    })



    bookreader.post("/api/library/book/find/name", (req, res) => {
        createNewMap()
        //this name constant requires "name" from body
        const name = req.body["name"]
        //this resName constant fiters books from myJson with searchName function
        const resName: Book[] = myJson.filter(book => searchName(name , book))
        res.json(resName)
    })


    bookreader.put("/api/library/book/add" , (req, res) => {
        createNewMap();
        let newID : number = 0

        //this do while condition generates random new id for new books in myMap
        do {
            newID = Math.floor((Math.random() * 1000) +1)
        } 
        while (newID == 0 || myMap.has(newID))

        //this variable push new book in myMap and creates new book from data in body
        let addBook = myJson.push({
            id: newID,
            name: req.body["name"],
            author: req.body["author"],
            genre: req.body["genre"],
            published: req.body["published"],
            publisher: req.body["publisher"],
            country_of_origin: req.body["country_of_origin"],
            pages: req.body["pages"]
            })
            
            //this saveBooks function saves Books in myMap
            saveBooks(myJson)
            console.log(myJson)
            res.json({addBook, Response: "Book was added!"})
        
    }
    )

    bookreader.delete("/api/library/book/:id/delete" , (req, res) => {
        createNewMap()
        const id = req.params["id"]
        let bookID = parseInt(id)
        console.log(bookID)

        //this if else condition deletes book when the bookID is found in myMap
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
