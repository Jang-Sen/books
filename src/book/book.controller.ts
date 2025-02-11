import { Body, Controller, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Book } from './entities/book.entity';

const GET_BOOK = 'get_book';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() dto: CreateBookDto) {
    return this.bookService.createBook(dto);
  }

  @MessagePattern(GET_BOOK)
  async handleGetBook(@Payload() data: { bookId: string }): Promise<Book> {
    const { bookId } = data;

    return this.bookService.getBook(bookId);
  }
}
