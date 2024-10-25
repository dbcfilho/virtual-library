document .addEventListener("DOMContentLoaded", function () {
    const bookForm = document.getElementById("bookForm");
    const bookList = document.getElementById("bookList");

    bookForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const book = { title, author, status: "available" };
        try {
            const response = await fetch("/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            const newBook = await response.json();
            addBookToList(newBook);
        } catch (error) {
            console.error(error);
        }
    });

    async function getBooks() {
        try {
            const response = await fetch("/api/books");
            const books = await response.json();
            books.forEach(addBookToList);
        } catch (error) {
            console.error(error);
        }
    }

    function addBookToList(book) {
        const bookListItem = document.createElement("li");
        bookListItem.textContent = `${book.title} by ${book.author} - ${book.status}`;
        bookList.appendChild(bookListItem);
    }

    getBooks();
});