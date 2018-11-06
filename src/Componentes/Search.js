import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI'
import Book from './Book';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: []
        }
    }

    search = (e) => {

        if (e.target.value === '') {
            this.setState({
                books: []
            })
            return;
        }
        BooksAPI.search(e.target.value)
            .then(res => {
                let books = [];
                if (!res.error) {
                    books = res;
                }
                this.setState({
                    books: books
                })
            })
            .catch(error => console.log(error))
    }

    mover = (book, newValue) => {
        console.log(book.props.book.shelf);
        console.log(book.props.book);
        console.log(newValue);

        book.props.book.shelf = newValue;

        this.setState((state) => ({
            books: state.books.filter((b) => b.id !== book.props.book.id).concat([book.props.book])
        }))

        BooksAPI.update(book.props.book, newValue);


    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.props.history.goBack()}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" onChange={this.search} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    booksChange={this.mover}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div >
        )
    }
}

export default Search;