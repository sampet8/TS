"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app;
var importedFile = fs.readFileSync("books.json");
var myJSON = JSON.parse(importedFile.toString());
var myMap = new Map();
myJSON.forEach(function (book) { return myMap.set(book.id, book); });
console.log(myJSON);
function createserver() {
    app = express();
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false }));
    http.createServer(app).listen(3000, function () {
        console.log("Running server on port 3000");
    });
    app.get("/api/library/book/:id/info", function (req, res) {
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
    app.post("/api/library/book/:id/info", function (req, res) {
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
