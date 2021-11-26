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
var app = (0, express_1.default)();
var myJSON = JSON.parse(fs_1.default.readFileSync(("src/Input/books.json")).toString());
var myMap = new Map();
myJSON.forEach(function (book) { return myMap.set(book.id, book); });
console.log(myJSON);
function updateMap() {
    var myJSON = JSON.parse(fs_1.default.readFileSync(("src/Input/books.json")).toString());
    var myMap = new Map();
    myJSON.forEach(function (book) { return myMap.set(book.id, book); });
}
function createserver() {
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)());
    app.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(app).listen(3000, function () {
        console.log("Running server on port 3000");
    });
    app.get("/api/library/book/:id/info", function (req, res) {
        updateMap();
        var id = req.params["id"];
        var tempid = parseInt(id);
        if (myMap.has(tempid)) {
            var book = myMap.get(tempid);
            console.log(tempid);
            var tempbookshort = {
                id: book.id,
                name: book.name,
                author: book.author,
                genre: book.genre
            };
            res.json(tempbookshort);
        }
        else {
            res.json({ id: "Error: NO book found on this id" });
        }
    });
    app.post("/api/library/book/:id/info", function (req, res) {
        updateMap();
        var id = req.params["id"];
        var tempid = parseInt(id);
        if (myMap.has(tempid)) {
            var book = myMap.get(tempid);
            console.log(tempid);
            res.json(book);
        }
        else {
            res.json({ id: "Error: NO book found on this id" });
        }
    });
    app.put("/api/library/book/:id/add", function (req, res) {
        updateMap();
        var id = req.params["id"];
        var tempid = parseInt(id);
        if (myMap.has(tempid)) {
            res.json({ id: "Error: Book found on this id" });
        }
        else {
            myJSON.push({
                id: tempid,
                name: req.body["name"],
                author: req.body["author"],
                genre: req.body["genre"],
                published: req.body["published"],
                publisher: req.body["publisher"],
                origin_country: req.body["origin_country"],
                pages: req.body["pages"]
            });
            fs_1.default.writeFileSync("src/Input/books.json", (JSON.stringify(myJSON, null, 2)));
            res.json({ message: "The following book was successfully added!", id: myJSON[myJSON.length - 1] });
        }
    });
    app.delete("/api/library/book/:id/delete", function (req, res) {
        updateMap();
        var id = req.params["id"];
        var tempid = parseInt(id);
        if (myMap.has(tempid)) {
            var myJSON2 = myJSON.filter(function (book) { return book.id !== tempid; });
            fs_1.default.writeFileSync("src/Input/books.json", (JSON.stringify(myJSON2, null, 2)));
            res.json({ message: "The following book was successfully deleted!", id: myJSON.filter(function (book) { return book.id === tempid; }) });
            updateMap();
        }
        else {
            res.json({ id: "Error: No book found on this id" });
        }
    });
}
createserver();
