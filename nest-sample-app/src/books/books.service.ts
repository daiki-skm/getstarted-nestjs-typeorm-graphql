import { Injectable } from '@nestjs/common';
import { Book } from './book';
import { NewBookInput } from './dto/newBook.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOneById(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async create(data: NewBookInput): Promise<Book> {
    const book = this.bookRepository.create(data);
    await this.bookRepository.save(book);
    return book;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.bookRepository.delete(id);
    return result.affected > 0;
  }
}
