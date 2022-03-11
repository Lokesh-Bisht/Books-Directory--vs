import { Request, Response } from 'express';
import { BooksRepository } from "../Repository/BooksRepository";

/**
 * A class for processing user requests like add, update and delete book.
 * And for fetching all books or books associated with a user.
 */
export class BooksController {
  
  // private repository: BooksRepository;
  
  // constructor(repository: BooksRepository) {
  //   this.repository = repository;
  // }

  // Get all Books
  getAllBooks(req: Request, res: Response) {
    new BooksRepository().fetchAllBooks(req)
    .then(data => res.status(200).json({ sucess: true, books: data }))
    .catch(error => res.status(400).json({ error }));
  }


  // Get a book by id
  getBook(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);

    new BooksRepository().getBookById(id)
    .then((data: any) => {
      if (data === undefined) {
        res.status(404).json({success: false, msg: `Failed to find book with id: ${id}`});
      } else {
        res.status(200).json({ success: true, book: data });
      }
    })
    .catch(error => res.status(400).json({ error }));
  }


  // Add a book
  addBook(req: Request, res: Response) {
    const { userID, title, description, coverImage } = req.body;

    // If userID, title, summary or coverImage is null
    if (!title || !description || !coverImage || !userID) {
      return res.status(400).json({success: false, msg: 
        'Incomplete info. Failed to add this book.'});
    }  

    new BooksRepository().addNewBook(req)
    .then(() => res.status(200).json({ success: true, msg: 'Book added' }))
    .catch(error => res.status(400).json({ success: false, msg: 'Failed to add book', error: error }));
  }


  // Update a book
  updateBook(req: Request, res: Response) {
    const { title, description, coverImage } = req.body;

    // If title, summary or coverImage is null
    if (!title || !description || !coverImage) {
      return res.status(400).json({success: false, msg: 
        'Update failed. Incomplete info.'});
    }

    new BooksRepository().updateBook(req)
    .then((data: any) => {
      console.log(data);
      if (data.affected == 0) {
        res.status(404).json({success: false, msg: `Failed to find book with id: ${req.params.id}`});
      } else {
        res.status(200).json({ success: true, msg: 'Book updated' });
      }
    })
    .catch(error => res.status(400).json({ error }));
  }

  // Delete a book
  deleteBook(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    
    new BooksRepository().deleteBook(id)
    .then((data: any) => {
      console.log(data);
      if (data.affected === 0) {
        res.status(404).json({success: false, msg: `Failed to find book for id: ${id}`});
      } else {
        res.status(200).json({ success: true, msg: 'Book deleted' });
      }
    })
    .catch(error => res.status(400).json({ error }));
  }

  // Get all books for a user with userID
  getAllBooksByUser(req: Request, res: Response) {
    let userID: string = req.params.id;

    new BooksRepository().getAllBooksWithUserID(userID)
    .then((data: any) => {
      if (data === undefined) {
        res.status(404).json({ success: false, msg: `Failed to find 
        books for user ${userID}` });
      } else {
        res.status(200).json({ success: true, book: data });
      }
    })
    .catch(error => res.status(400).json({ error }));
  }


  // Get a book with ID for a user with userID
  getBookByUser(req: Request, res: Response) {
    
    let userID: string = req.params.userID;
    let bookID: number = Number(req.params.bookID);

    new BooksRepository().getBookWithUserID(userID, bookID)
    .then((data: any) => {

      if (data === undefined) {
        res.status(404).json({ success: false, msg: `Failed to find 
        book ${bookID} for user ${userID}` });
      } else {
        res.status(200).json({ success: true, book: data});
      }
    })
    .catch(error => res.status(400).json({ error }));
  }

}