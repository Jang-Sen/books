import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { DeleteResult, Repository } from 'typeorm';
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

  // 책 정보 찾기
  async getBook(bookId: string): Promise<Book> {
    const book = await this.repository.findOneBy({ id: bookId });

    if (!book) {
      throw new NotFoundException('Book Not Found');
    }

    return book;
  }

  // 책 주문 수량 감소
  async isBookInStock(bookId: string, quantity: number): Promise<Book> {
    const book = await this.repository.findOneBy({ id: bookId });

    if (!book) {
      throw new NotFoundException('Book Not Found');
    }

    book.stock -= quantity;

    // 조건문(stock이 quantity 보다 적다면, 재고가 없는 경우 핸들링) 추가

    const updateBook = await this.repository.save(book);

    return updateBook;
  }

  // 책 주문 취소
  async decreaseStock(bookId: string, quantity: number): Promise<DeleteResult> {
    const book = await this.repository.findOneBy({ id: bookId });

    if (!book) {
      throw new NotFoundException('Book Not Found');
    }

    book.stock += quantity;

    return await this.repository.delete(bookId);
  }

  // 수정
  async increaseStock(bookId: string, quantity: number): Promise<Book> {
    const book = await this.repository.findOneBy({ id: bookId });

    if (!book) {
      throw new NotFoundException('Book Not Found');
    }

    book.stock += quantity;

    const updateBook = await this.repository.save(book);

    return updateBook;
  }
}
