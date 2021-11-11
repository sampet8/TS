export type Book_Complete = {
    id: number
    name: string
    author: string[]
    genre: string[]
    published: number
    publisher: string
    country_of_origin: string
    pages: number
}



export type Book_Short = {
    id: number
    name: string
    author: string[]
    genre: string[]
}