import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log('target', target)
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    // ! DRY!. WE WILL NEVER REPEAT OUR SELVES

    const { txt, author, lang, maxPrice, pageCount } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>

            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title:</label>
                <input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="By Title" />

                <label htmlFor="author">Author:</label>
                <input value={author} onChange={handleChange} name="author" id="author" type="text" placeholder="By Author" />

                <label htmlFor="lang">Language:</label>
                <input value={lang} onChange={handleChange} name="lang" id="lang" type="text" placeholder="By Language" />

                <label htmlFor="maxPrice">Max Price:</label>
                <input value={maxPrice} onChange={handleChange} name="maxPrice" id="maxPrice" type="number" placeholder="By Max Price" />

                <label htmlFor="pageCount">Page Count:</label>
                <input value={pageCount} onChange={handleChange} name="pageCount" id="pageCount" type="number" placeholder="By Page Count" />

                {/* <label htmlFor="isOnSale">On Sale:</label>
                <input value={isOnSale} onChange={handleChange} name="isOnSale" id="isOnSale" type="checkbox" /> */}

                <button>Filter Books</button>
            </form>

        </section>
    )
}