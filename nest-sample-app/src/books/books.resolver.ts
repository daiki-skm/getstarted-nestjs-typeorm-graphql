import { Resolver, Args, Int, Mutation, Query } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { Book } from './book';
import { BooksService } from './books.service';
import { NewBookInput } from './dto/newBook.input';

@Resolver()
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query((returns) => [Book])
  books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Query((returns) => Book)
  async getBook(@Args({ name: 'id', type: () => Int }) id: number) {
    const book = await this.booksService.findOneById(id);
    if (!book) {
      throw new NotFoundException(id);
    }
    return book;
  }

  @Mutation((returns) => Book)
  addBook(@Args('newBook') newBook: NewBookInput): Promise<Book> {
    return this.booksService.create(newBook);
  }

  @Mutation((returns) => Boolean)
  async removeBook(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.booksService.remove(id);
  }
}
