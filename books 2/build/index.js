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
function createNewMap() {
    var myJson = JSON.parse(fs_1.default.readFileSync(("books.json")).toString());
    var myMap = new Map();
    myJson.forEach(function (book) { return myMap.set(book.id, book); });
}
function createserver() {
    bookreader.use((0, cors_1.default)());
    bookreader.use((0, body_parser_1.json)());
    bookreader.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(bookreader).listen(4000, function () {
        console.log("Running server on port 4000");
    });
    bookreader.get("/api/library/book/:id/info", function (req, res) {
        createNewMap();
        var id = req.params["id"];
        var bookID = parseInt(id);
        var book = myMap.get(bookID);
        console.log(bookID);
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
        createNewMap();
        var id = req.params["id"];
        var bookID = parseInt(id);
        var book = myMap.get(bookID);
        console.log(bookID);
        if (myMap.has(bookID)) {
            res.json(book);
        }
        else {
            res.json({ id: "Book not found" });
        }
    });
    bookreader.put("/api/library/book/:id/add", function (req, res) {
        createNewMap();
        var id = req.params["id"];
        var bookID = parseInt(id);
        console.log(bookID);
        if (myMap.has(bookID)) {
            res.json({ id: "Book not found!" });
        }
        else {
            var addBook = myJson.push({
                id: bookID,
                name: req.body["name"],
                author: req.body["author"],
                genre: req.body["genre"],
                published: req.body["published"],
                publisher: req.body["publisher"],
                country_of_origin: req.body["country_of_origin"],
                pages: req.body["pages"]
            });
            (0, methods_1.save)(myJson);
            console.log(myJson);
            res.json({ addBook: addBook, Response: "Book was added!" });
        }
    });
    bookreader.delete("/api/library/book/:id/delete", function (req, res) {
        createNewMap();
        var id = req.params["id"];
        var bookID = parseInt(id);
        console.log(bookID);
        if (myMap.has(bookID)) {
            var deleteJson = myJson.filter(function (book) { return book.id !== bookID; });
            fs_1.default.writeFileSync("books.json", (JSON.stringify(deleteJson, null, 2)));
            res.json({ message: "Book was deleted!" });
            createNewMap();
        }
        else {
            res.json({ id: "Book not found!" });
        }
    });
}
createserver();
