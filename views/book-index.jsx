const { useEffect, useState } = React

import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { BookDetails } from "./book-details.jsx"

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(books => setBooks(books))
        showSuccessMsg('Welcome to Miss Books shop!')
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            showSuccessMsg(`Book (${bookId}) removed!`)
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onSelectBook(book) {
        setSelectedBook(book)
    }

    console.log('render');
    return (
        <section className="book-index">
            {!selectedBook && <React.Fragment>
                <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <BookList onSelectBook={onSelectBook} books={books} onRemoveBook={onRemoveBook} />
            </React.Fragment>}

            {selectedBook && <BookDetails onBack={() => setSelectedBook(null)} book={selectedBook} />}
        </section>
    )
}