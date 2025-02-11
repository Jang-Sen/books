import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  // 등록
  async createBook(dto: CreateBookDto) {
    const book = this.repository.create(dto);

    return await this.repository.save(book);
  }

  //
  async getBook(bookId: string): Promise<Book> {
    const book = await this.repository.findOneBy({ id: bookId });

    if (!book) {
      throw new NotFoundException('Book Not Found');
    }

    return book;
  }
}
