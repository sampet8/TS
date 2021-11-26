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
exports.save = exports.bookExistence = void 0;
var fs = __importStar(require("fs"));
/*
export function searchBook(id: string, books: Book[]) {
    for (let i=0; i < books.length; i++) {
        if (books[i].id == id.toString()){
            return books[i]
        }
}}*/
function bookExistence(book) {
    return book != undefined;
}
exports.bookExistence = bookExistence;
function save(books) {
    fs.writeFileSync("books.json", (JSON.stringify(books, null, 2)));
}
exports.save = save;
