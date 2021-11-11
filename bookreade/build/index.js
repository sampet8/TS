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
var bookreader;
var data = fs_1.default.readFileSync("books.json");
var myJSON = JSON.parse(data.toString());
var myMap = new Map();
myJSON.forEach(function (book) { return myMap.set(book.id, book); });
console.log(myJSON);
function createserver() {
    bookreader = (0, express_1.default)();
    bookreader.use((0, cors_1.default)());
    bookreader.use((0, body_parser_1.json)());
    bookreader.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(bookreader).listen(3000, function () {
        console.log("Running server on port 3000");
    });
    bookreader.get("/api/library/book/:id/info", function (req, res) {
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
}
createserver();
