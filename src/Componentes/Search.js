import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI'
import Book from './Book';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            myBooks: []
        }
    }

    componentDidMount = () => {
        this.fetchMyBooks();
    }

    fetchMyBooks = () => {
        return BooksAPI.getAll().then((books) => {
            this.setState({
                myBooks: books
            });
            return books;
        })
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
                this.mapSeachedBooksToMyBooks(books);

            })
            .catch(error => console.log(error))
    }

    mapSeachedBooksToMyBooks = (searchedBooks) => {
        searchedBooks.forEach(book => {
            let myBook = this.state.myBooks.find((b) => b.id === book.id);
            if (myBook) {
                book.shelf = myBook.shelf;
            }
        });
        this.setState({
            books: searchedBooks
        })
    }

    mover = (book, newValue) => {
        book.props.book.shelf = newValue;

        BooksAPI.update(book.props.book, newValue)
            .then(this.fetchMyBooks().then(this.mapSeachedBooksToMyBooks(this.state.books)));
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
                            <li key={book.id + book.shelf}>
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