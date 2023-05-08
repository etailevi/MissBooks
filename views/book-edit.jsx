const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Had issued in book edit:', err);
                navigate('/book')
                showErrorMsg('Book not found!')
            })
    }


    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setBookToEdit(prevBook => {
            if (field === 'amount') {
                return {
                    ...prevBook,
                    listPrice: {
                        ...prevBook.listPrice,
                        amount: value
                    }
                }
            }
            return ({
                ...prevBook, [field]: value
            })
        })
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
            })
    }

    const { title, listPrice, authors, language, pageCount } = bookToEdit
    return (
        <section className="book-edit">
            <h2>{bookToEdit.id ? 'Edit' : 'Add'} Book</h2>

            <form onSubmit={onSaveBook} >
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="amount">List Price:</label>
                <input onChange={handleChange} value={listPrice.amount} type="number" name="amount" id="amount" />

                {/* <label htmlFor="authors">Author:</label>
                <input value={authors} onChange={handleChange} name="authors" id="authors" type="text" />

                <label htmlFor="language">Language:</label>
                <input value={language} onChange={handleChange} name="language" id="language" type="text" />

                <label htmlFor="pageCount">Page Count:</label>
                <input value={pageCount} onChange={handleChange} name="pageCount" id="pageCount" type="number" /> */}


                <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
            </form>

        </section>
    )

}