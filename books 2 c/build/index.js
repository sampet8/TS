"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = require("body-parser");
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var methods_1 = require("./methods");
var bookreader = (0, express_1.default)();
var data = fs_1.default.readFileSync("books.json");
var myJson = JSON.parse(data.toString());
var myMap = new Map();
myJson.forEach(function (book) { return myMap.set(book.id, book); });
console.log(myJson);
/*
function createNewMap() {
    const myJson: Book[] = JSON.parse(fs.readFileSync(("books.json")).toString())
    let myMap = new Map()
    myJson.forEach((book: Book_Short) => myMap.set(book.id,<Book_Short> book))
}

let searchAuthor = function (author: string, book: Book) {
    for(let i = 0; i < book.author.length; i++){
        if(book.author[i].toLowerCase().includes(author.toLowerCase())){
            return book
        }
    }
}


let searchName = function (name: string, book: Book){
    for(let i = 0; i < book.name.length; i++){
        if(book.name[i].toLowerCase().includes(name.toLowerCase())){
            return book
        }
    }
}*/
function createserver() {
    bookreader.use((0, cors_1.default)());
    bookreader.use((0, body_parser_1.json)());
    bookreader.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(bookreader).listen(4000, function () {
        console.log("Running server on port 4000");
    });
    bookreader.get("/api/library/book/:id/info", function (req, res) {
        (0, methods_1.createNewMap)();
        var id = req.params["id"];
        var bookID = parseInt(id);
        var book = myMap.get(bookID);
        console.log(bookID);
        //this if else condition returns tempbookshort variable if bookID is found in myMap
        if (myMap.has(bookID)) {
            var tempbookshort = {
                id: book.id,
                name: book.name,
                author: book.author,
                genre: book.genre,
            };
            res.json(tempbookshort);
        }
        else {
            res.json({ id: "Book not found" });
        }
    });
    bookreader.post("/api/library/book/:id/info", function (req, res) {
        (0, methods_1.createNewMap)();
        var id = req.params["id"];
        var bookID = parseInt(id);
        var book = myMap.get(bookID);
        console.log(bookID);
        //this if else condition returns book if bookID is found in myMap        
        if (myMap.has(bookID)) {
            res.json(book);
        }
        else {
            res.json({ id: "Book not found" });
        }
    });
    bookreader.post("/api/library/book/find/author", function (req, res) {
        (0, methods_1.createNewMap)();
        //this author constant requires "author" from body
        var author = req.body["author"];
        //this resAuthor constant fiters books from myJson with searchAuthor function
        var resAuthor = myJson.filter(function (book) { return (0, methods_1.searchAuthor)(author, book); });
        res.json(resAuthor);
    });
    bookreader.post("/api/library/book/find/name", function (req, res) {
        (0, methods_1.createNewMap)();
        //this name constant requires "name" from body
        var name = req.body["name"];
        //this resName constant fiters books from myJson with searchName function
        var resName = myJson.filter(function (book) { return (0, methods_1.searchName)(name, book); });
        res.json(resName);
    });
    bookreader.put("/api/library/book/add", function (req, res) {
        (0, methods_1.createNewMap)();
        var newID = 0;
        //this do while condition generates random new id for new books in myMap
        do {
            newID = Math.floor((Math.random() * 1000) + 1);
        } while (newID == 0 || myMap.has(newID));
        //this variable push new book in myMap and creates new book from data in body
        var addBook = myJson.push({
            id: newID,
            name: req.body["name"],
            author: req.body["author"],
            genre: req.body["genre"],
            published: req.body["published"],
            publisher: req.body["publisher"],
            country_of_origin: req.body["country_of_origin"],
            pages: req.body["pages"]
        });
        //this saveBooks function saves Books in myMap
        (0, methods_1.saveBooks)(myJson);
        console.log(myJson);
        res.json({ addBook: addBook, Response: "Book was added!" });
    });
    bookreader.delete("/api/library/book/:id/delete", function (req, res) {
        (0, methods_1.createNewMap)();
        var id = req.params["id"];
        var bookID = parseInt(id);
        console.log(bookID);
        //this if else condition deletes book when the bookID is found in myMap
        if (myMap.has(bookID)) {
            var deleteJson = myJson.filter(function (book) { return book.id !== bookID; });
            fs_1.default.writeFileSync("books.json", (JSON.stringify(deleteJson, null, 2)));
            res.json({ message: "Book was deleted!" });
            (0, methods_1.createNewMap)();
        }
        else {
            res.json({ id: "Book not found!" });
        }
    });
}
createserver();
