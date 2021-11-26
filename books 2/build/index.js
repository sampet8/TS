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
var myJSON = JSON.parse(data.toString());
var myMap = new Map();
myJSON.forEach(function (book) { return myMap.set(book.id, book); });
console.log(myJSON);
function createNewMap() {
    var myJSON = JSON.parse(fs_1.default.readFileSync(("books.json")).toString());
    var myMap = new Map();
    myJSON.forEach(function (book) { return myMap.set(book.id, book); });
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
        var tempid = parseInt(id);
        var book = myMap.get(tempid);
        console.log(tempid);
        if (myMap.has(tempid)) {
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
        var tempid = parseInt(id);
        var book = myMap.get(tempid);
        console.log(tempid);
        if (myMap.has(tempid)) {
            res.json(book);
        }
        else {
            res.json({ id: "Book not found" });
        }
    });
    bookreader.put("/api/library/book/:id/add", function (req, res) {
        createNewMap();
        var id = req.params["id"];
        var tempid = parseInt(id);
        if (myMap.has(tempid)) {
            res.json({ id: "Book not found!" });
        }
        else {
            var addBook = myJSON.push({
                id: tempid,
                name: req.body["name"],
                author: req.body["author"],
                genre: req.body["genre"],
                published: req.body["published"],
                publisher: req.body["publisher"],
                country_of_origin: req.body["country_of_origin"],
                pages: req.body["pages"]
            });
            (0, methods_1.save)(myJSON);
            console.log(myJSON);
            res.json(addBook);
            res.json({ Response: "Book was added!" });
        }
    });
    bookreader.delete("/api/library/book/:id/delete", function (req, res) {
        createNewMap();
        var id = req.params["id"];
        var tempid = parseInt(id);
        console.log(tempid);
        if (myMap.has(tempid)) {
            var deleteJSON = myJSON.filter(function (book) { return book.id !== tempid; });
            fs_1.default.writeFileSync("books.json", (JSON.stringify(deleteJSON, null, 2)));
            res.json({ message: "Book was deleted!" });
            createNewMap();
        }
        else {
            res.json({ id: "Book not found!" });
        }
    });
}
createserver();
