const router = require("express").Router();
const Author = require("../models/Author.model");
const Book = require("../models/Book.model");

router.get("/", (req, res, next) => {
  let books; // we create a variable in the parent scope

  Book.find()
    .then((booksFromDB) => {
      books = booksFromDB; // update our variable in the parent scope
      return Author.find();
    })
    .then((authorsFromDB) => {
      const authorsArr = authorsFromDB.map((authorDetails) => {
        const { _id, name, age, country } = authorDetails;
        const booksFromCurrentAuthor = books.filter((book) => {
          return book.author.toString() == _id.toString(); // compare ids as string
        });
        const numberOfBooks = booksFromCurrentAuthor.length;

        return { name, age, country, numberOfBooks };
      });

      res.render("authors/authors-list", { authors: authorsArr });
    })
    .catch((err) => {
      console.log("Error getting authors from DB...", err);
    });
});

module.exports = router;
