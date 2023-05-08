const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { LongTxt } from '../cmps/book-long-txt.jsx'
import { bookService } from "../services/book.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issued in book details:', err);
                navigate('/book')
            })
    }
    console.log('book', book)

    function onBack() {
        navigate('/book')
    }

    function getClassColors(book) {
        let priceColor = "black"
        if (book.listPrice.amount > 150) priceColor = "red"
        else if (book.listPrice.amount < 20) priceColor = "green"
        return priceColor
    }
    function onSale(book) {
        return book.listPrice.isOnSale ? "onSale" : "none"
    }
    // const currencySign = new Intl.NumberFormat(book.listPrice.currencyCode, {style: currency})
    // console.log('currency', currencySign)

    function getReadingLevel() { // remove parameter
        if (book.pageCount > 500) {
            return 'Serious Reading'
        } else if (book.pageCount > 200) {
            return 'Descent Reading'
        } else {
            return 'Light Reading'
        }
    }

    function checkPublishedDate(publishedYear) {
        const dateDiff = new Date().getFullYear() - publishedYear
        if (dateDiff > 10) return 'Vintage'
        if (dateDiff <= 1) return 'New'
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Book title: {book.title}</h1>
            <h2>Author: {book.authors}</h2>
            <h5>List Price: <span className={getClassColors(book)}>{book.listPrice.amount} {book.listPrice.currencyCode}</span></h5>
            <h5>Book language is: {book.language.toUpperCase()}</h5>
            <h5 className={onSale(book)}>This book is on SALE</h5>
            <img src={book.thumbnail} alt="" />
            <h5>Pages Amount: {book.pageCount} ({getReadingLevel()})</h5>
            <div><LongTxt txt={book.description} /></div>
            <h5>The book was published on: {book.publishedDate} ({checkPublishedDate(book.publishedDate)})</h5>
            <button onClick={onBack}>Back</button>
        </section>
    )

}