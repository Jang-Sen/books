import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Book } from './entities/book.entity';
import { DeleteResult } from 'typeorm';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

const GET_BOOK = 'get_book';
const IS_BOOK_IN_STOCK = 'is_book_in_stock';
const DECREASE_STOCK = 'decrease_stock';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: '책 등록' })
  async createBook(@Body() dto: CreateBookDto): Promise<Book> {
    console.log(typeof dto.price);
    console.log(typeof dto.stock);

    return this.bookService.createBook(dto);
  }

  @MessagePattern(GET_BOOK)
  async handleGetBook(@Payload() data: { bookId: string }): Promise<Book> {
    const { bookId } = data;

    return this.bookService.getBook(bookId);
  }

  @MessagePattern(IS_BOOK_IN_STOCK)
  async handleIsBookInStock(
    @Payload() data: { bookId: string; quantity: number },
  ): Promise<Book> {
    const { bookId, quantity } = data;

    return await this.bookService.isBookInStock(bookId, quantity);
  }

  @MessagePattern(DECREASE_STOCK)
  async handleDecreaseStock(
    @Payload() data: { bookId: string; quantity: number },
  ): Promise<DeleteResult> {
    const { bookId, quantity } = data;

    return await this.bookService.decreaseStock(bookId, quantity);
  }

  @Patch('/:id')
  @ApiOperation({ summary: '책 재고 수정' })
  async increaseStock(
    @Param('id') id: string,
    @Body() body: { quantity: number },
  ): Promise<Book> {
    const { quantity } = body;

    return await this.bookService.increaseStock(id, quantity);
  }
}
