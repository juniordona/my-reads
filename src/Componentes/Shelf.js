import React from 'react';
import Book from './Book'

const Shelf = function (props) {

    let handleBook = (book, shelf) => {
        props.onBook(book, shelf);
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book) => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                booksChange={handleBook}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )

}

export default Shelf