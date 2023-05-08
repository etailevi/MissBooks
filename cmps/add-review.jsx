const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js";

export function AddReview({ book }) {

    console.log(book)
    const [review, setReview] = useState({
        fullName: '',
        rating: 5,
        readAt: '08-05-2023'
    })

    const navigate = useNavigate()
    const params = useParams()

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        console.log('field', field)
        console.log('value', value)
        setReview(prevBook => ({ ...prevBook, reviews: { ...prevBook.reviews, [field]: value } }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.save(review)
    }

    return (
        <section>
            <h1>Add a review</h1>
            <form onSubmit={onSaveReview} >
                <label htmlFor="fullName">Full Name:</label>
                <input onChange={handleChange} value="fullName" type="text" name="name" id="fullName" placeholder="Enter your full name here" />

                <label htmlFor="readAt">Read At:</label>
                <input onChange={handleChange} value="readAt" type="date" name="readAt" id="readAt" />

                <label htmlFor="rating">Rating:</label>
                <input onChange={handleChange} value="rating" type="number" name="rating" id="rating" placeholder="5" />

                <button onClick={bookService.addReview}>Send</button>
                <button onClick={bookService.removeReview}>Delete</button>
            </form>
        </section>
    )
}