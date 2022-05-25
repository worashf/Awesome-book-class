import Book from './Book.js';

const listBook = document.getElementById('book-list');
const addForm = document.getElementById('add-form');

class UI {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static storeBook(book) {
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBooks() {
    const books = UI.getBooks();
    let bookDiv = '';

    if (books.length !== 0 && books) {
      books.forEach((book, index) => {
        bookDiv += `
      <div class="book-item ${index % 2 ? 'white-back' : 'gray-back'}">

      <p class="book-info">${book.title} by ${book.author}</p>


      <button type="button" id="remove-btn"  onClick='removeBook(${index})' class="remove-btn"> Remove </button>

      </div>`;
      });

      listBook.innerHTML = bookDiv;
      const removeBtn = document.querySelectorAll('.remove-btn');
      removeBtn.forEach((button, index) => button.addEventListener('click', () => {
        UI.deleteBook(index);
      }));
    } else {
      bookDiv += `
            <div class="book">
            <p class="book-message"> No book Available<p>
            </div> `;
      listBook.innerHTML = bookDiv;
    }
  }

  static saveBook(title, author) {
    if (title && author) {
      const book = new Book(title, author);
      UI.storeBook(book);
      UI.displayBooks();
    }
  }

  static deleteBook(index) {
    const books = this.getBooks();
    const filteredBook = books.filter((book, i) => index !== i);
    localStorage.setItem('books', JSON.stringify(filteredBook));
    UI.displayBooks();
  }
}
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  if (title.value.trim !== '' && author.value.trim !== '') {
    UI.saveBook(title.value, author.value);
    title.value = '';
    author.value = '';
  }
});

UI.displayBooks();