import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {AuthorsController} from "./authors/authors.controller";
import {CreateAuthorHandler} from "./authors/commands/create-author/create-author.handler";
import {UpdateAuthorHandler} from "./authors/commands/update-author/update-author.handler";
import {DeleteAuthorHandler} from "./authors/commands/delete-author/delete-author.handler";
import {GetAllAuthorsHandler} from "./authors/queries/get-all-authors/get-all-authors.handler";
import {GetAuthorByIdHandler} from "./authors/queries/get-author-by-id/get-author-by-id.handler";
import {BookCategoriesController} from "./book-categories/book-categories.controller";
import {CreateBookCategoryHandler} from "./book-categories/commands/create-book-category/create-book-category.handler";
import {UpdateBookCategoryHandler} from "./book-categories/commands/update-book-category/update-book-category.handler";
import {DeleteBookCategoryHandler} from "./book-categories/commands/delete-book-category/delete-book-category.handler";
import {GetAllBookCategoriesHandler} from "./book-categories/queries/get-all-book-categories/get-all-book-categories.handler";
import {GetBookCategoryByIdHandler} from "./book-categories/queries/get-book-category-by-id/get-book-category-by-id.handler";
import {BooksController} from "./books/books.controller";
import {CreateBookHandler} from "./books/commands/create-book/create-book.handler";
import {UpdateBookHandler} from "./books/commands/update-book/update-book.handler";
import {DeleteBookHandler} from "./books/commands/delete-book/delete-book.handler";
import {GetAllBooksHandler} from "./books/queries/get-all-books/get-all-books.handler";
import {GetBookByIdHandler} from "./books/queries/get-book-by-id/get-book-by-id.handler";

@Module({
    imports: [CqrsModule],
    controllers: [AuthorsController, BookCategoriesController, BooksController],
    providers: [
        CreateAuthorHandler,
        UpdateAuthorHandler,
        DeleteAuthorHandler,
        GetAllAuthorsHandler,
        GetAuthorByIdHandler,
        CreateBookCategoryHandler,
        UpdateBookCategoryHandler,
        DeleteBookCategoryHandler,
        GetAllBookCategoriesHandler,
        GetBookCategoryByIdHandler,
        CreateBookHandler,
        UpdateBookHandler,
        DeleteBookHandler,
        GetAllBooksHandler,
        GetBookByIdHandler,
    ],
})
export class LibraryModule {}
