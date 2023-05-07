import {LongTxt} from '../cmps/book-long-txt.jsx'

export function BookDetails({ book, onBack }) {
    let priceColor = "black"
    if (book.listPrice.amount > 150) priceColor = "red"
    else if (book.listPrice.amount < 20) priceColor = "green"
    const signSale = book.listPrice.isOnSale ? "onSale" : "none"
    // const currencySign = new Intl.NumberFormat(book.listPrice.currencyCode, {style: currency})
    // console.log('currency', currencySign)

    function getReadingLevel(pageCount) {
        if (pageCount > 500) {
            return 'Serious Reading'
        } else if (pageCount > 200) {
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

    return (
        <section className="book-details">
            <h1>Book title: {book.title}</h1>
            <h2>Author: {book.authors}</h2>
            <h5>List Price: <span className={`${priceColor}`}>{book.listPrice.amount} {book.listPrice.currencyCode}</span></h5>
            <h5>Book language is: {book.language.toUpperCase()}</h5>
            <h5 className={`${signSale}`}>This book is on SALE</h5>
            <img src={book.thumbnail} alt="" />
            <h5>Pages Amount: {book.pageCount} ({getReadingLevel(book.pageCount)})</h5>
            <div><LongTxt txt={book.description} /></div>
            <h5>The book was published on: {book.publishedDate} ({checkPublishedDate(book.publishedDate)})</h5>
            <button onClick={onBack}>Back</button>
        </section>
    )

}