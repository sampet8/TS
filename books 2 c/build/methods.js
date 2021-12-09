"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchName = exports.searchAuthor = exports.saveBooks = exports.createNewMap = void 0;
var fs = __importStar(require("fs"));
/**
 * Creates new map
 */
function createNewMap() {
    //defines myJson and provides updates of myMap
    var myJson = JSON.parse(fs.readFileSync(("books.json")).toString());
    var myMap = new Map();
    myJson.forEach(function (book) { return myMap.set(book.id, book); });
}
exports.createNewMap = createNewMap;
/**
 * Saves books
 * @param books object we are saving
 */
function saveBooks(books) {
    fs.writeFileSync("books.json", (JSON.stringify(books, null, 2)));
}
exports.saveBooks = saveBooks;
/**
 * Searches author
 * @param author string parameter for an author of the book
 * @param book  parameter for the object in which we are looking for data
 * @returns book - object containing data
 */
function searchAuthor(author, book) {
    for (var i = 0; i < book.author.length; i++) {
        if (book.author[i].toLowerCase().includes(author.toLowerCase())) {
            return book;
        }
    }
}
exports.searchAuthor = searchAuthor;
/**
 * Searches name
 * @param name string parameter for a name of the book
 * @param book parameter for the object in which we are looking for data
 * @returns  book - object containing data
 */
function searchName(name, book) {
    for (var i = 0; i < book.name.length; i++) {
        if (book.name[i].toLowerCase().includes(name.toLowerCase())) {
            return book;
        }
    }
}
exports.searchName = searchName;
