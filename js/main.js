// Ids
const booksContainer = document.getElementById('booksContainer');
const nameInpt = document.getElementById('nameInpt');
const authorInpt = document.getElementById('authorInpt');
const submitBtn = document.getElementById('submitBtn');
const bookForm = document.getElementById('bookForm');
const errorMessage = document.querySelector('.errorMessage');

let books = [];

// Fuctions
function setBook() {
  if (nameInpt.value === '' || authorInpt.value === '') {
    errorMessage.style.display = 'block';
  } else {
    const book = {
      id: books.length,
      title: nameInpt.value,
      author: authorInpt.value,
    };
    books = [...books, book];
    errorMessage.style.display = 'none';
  }
}

const printBooks = () => {
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild);
  }

  if (books.length > 0) {
    books.forEach((book) => {
      const div = document.createElement('div');
      div.classList.add('book__content');
      div.innerHTML = `
            <h3 class="book__features">"${book.title}" by ${book.author}</h3>
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

const removeBook = (el) => {
  if (el.target.classList.contains('removeBook')) {
    const bookId = Number(el.target.getAttribute('data-id'));

    const newBooks = books.filter((item) => item.id !== bookId);
    books = newBooks;
    printBooks();
  }
};

// Listeners
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  setBook();
  printBooks();
  bookForm.reset();
});

booksContainer.addEventListener('click', (el) => {
  removeBook(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('books')) || [];
  books = data;
  printBooks();
});
