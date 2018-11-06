import React , { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf'

class Books extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onBook: PropTypes.func.isRequired
    }

    handleBook = (book, shelf) => {
        this.props.onBook(book, shelf);
    }

    render() {
        return (
            <div className="list-books-content">
                <div>
                    <Shelf
                        title="Currently Reading"
                        cat="currentlyReading"
                        books={this.props.books.filter(bs => bs.shelf === 'currentlyReading')}
                        onBook={this.handleBook}
                    />
                    <Shelf
                        title="Want to Read"
                        cat="wantToRead"
                        books={this.props.books.filter(bs => bs.shelf === 'wantToRead')}
                        onBook={this.handleBook}
                    />
                    <Shelf
                        title="Read"
                        cat="read"
                        books={this.props.books.filter(bs => bs.shelf === 'read')}
                        onBook={this.handleBook}
                    />
                </div>
            </div>
        )
    }
}

export default Books