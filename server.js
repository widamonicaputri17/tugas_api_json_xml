const express = require('express');
const bodyParser = require('body-parser');
const xmlbuilder = require('xmlbuilder');
const app = express();
const port = 3001;

app.use(bodyParser.json());

// data buku
let books = [
    {id: 1, title: "Kitab Sahih Bukhari", author: "Imam Bukhari"},
    {id: 2, title: "Kitab Maulid Simtudduror", author: "Habib Ali bin Muhammad bin Husein Al-Haddad"},
    {id: 3, title: "Ar-Risalah al-Ghausiyah", author: "Abdul Qadir al-Jailani"},
    {id: 4, title: "Tafsir al-Mizan", author: "Allamah Tabatabai"},
    {id: 5, title: "Ar-Risalah ", author: "Imam Syafi'i"},
    {id: 6, title: "Sirah Ibnu Hisyam", author: "Ibnu Hisyam"},
];

// Endpoint GET (mendapatkan daftar buku)
app.get('/books', (req, res) => {
    const acceptHeader = req.headers.accept;
    if (acceptHeader && acceptHeader.includes('application/xml')) {
        // data ke XML
        const xml = xmlbuilder.create('books');
        books.forEach(book => {
            xml.ele('book', { id: book.id })
                .ele('title', book.title)
                .up()
                .ele('author', book.author)
                .up();
        });
        res.header('Content-Type', 'application/xml');
        res.send(xml.end({ pretty: true }));
    } else {
        // Mengembalikan ke JSON
        res.json(books);
    }
});

// Endpoint POST (menambahkan buku baru)
app.post('/books', (req, res) => {
    console.log(req.body); 
    const newBook = req.body;
    newBook.id = books.length + 1; // id baru
    books.push(newBook);
    res.status(201).json(newBook);
});

// jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
