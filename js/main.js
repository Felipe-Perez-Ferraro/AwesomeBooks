// Ids
const booksContainer = document.getElementById('booksContainer');
const nameInpt = document.getElementById('nameInpt');
const authorInpt = document.getElementById('authorInpt');
const submitBtn = document.getElementById('submitBtn');
const bookForm = document.getElementById('bookForm');
const errorMessage = document.querySelector('.errorMessage');

let books = [];

// Function for printing the stored bookes on the UI
const printBooksToUI = () => {
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild);
  }

  if (books.length > 0) {
    books.forEach((book) => {
      const div = document.createElement('div');
      div.classList.add('list__section__book__content');
      div.innerHTML = `
            <h3 class="list__section__book__features">"${book.title}" by ${book.author}</h3>
            <button data-id="${book.id}" class="removeBook">Remove</button>
            `;
      booksContainer.appendChild(div);
    });
  } else {
    const message = document.createElement('h5');
    message.textContent = "There isn't any book yet...";
    booksContainer.appendChild(message);
  }

  localStorage.setItem('books', JSON.stringify(books));
};

class Books {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addBook() {
    if (nameInpt.value === '' || authorInpt.value === '') {
      errorMessage.style.display = 'block';
    } else {
      const newBook = new Books(books.length, nameInpt.value, authorInpt.value);
      books = [...books, newBook];
      errorMessage.style.display = 'none';
    }
  }

  removeBook(el) {
    if (el.target.classList.contains('removeBook')) {
      const bookId = Number(el.target.getAttribute('data-id'));
      const newBooks = books.filter((item) => item.id !== bookId);
      books = newBooks;
      printBooksToUI();
    }
  }
}

// Listeners
submitBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  const aBook = new Books(books.length, nameInpt.value, authorInpt.value);
  aBook.addBook();
  printBooksToUI();
  bookForm.reset();
});

booksContainer.addEventListener('click', (el) => {
  const rBook = new Books(books.length, nameInpt.value, authorInpt.value);
  rBook.removeBook(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('books')) || [];
  books = data;
  printBooksToUI();
});
