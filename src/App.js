import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Componentes/Books'


class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books : []
  };


  componentDidMount = () =>{
    BooksAPI.getAll().then((books) => {
      this.setState({
          books: books
      });
    })
  }

  mover = (book, newValue) => {

    book.props.book.shelf = newValue;

    this.setState( (state) => ({
        books: state.books.filter( (b) => b.id !== book.props.book.id).concat([book.props.book])
    }))

    BooksAPI.update(book.props.book, newValue);

}


  render() {
    return (
      <div className="app">
          
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <Books
                books={this.state.books}
                onBook={this.mover}
              />
              
            </div>
        </div>
    )
  }
}

export default BooksApp
