import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto';
import { Book } from './types';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('books')
  async getBooks() {
    return await this.bookService.getBooks();
  }

  @Get('books/:id')
  async getBookById(@Param('id') id: number): Promise<Book> {
    return await this.bookService.getBookById(id);
  }

  @Post('books')
  async createBook(@Body() dto: BookDto): Promise<Book> {
    return this.bookService.createBook(dto);
  }

  @Put('books/:id')
  async updateBookId(
    @Param('id') id: number,
    @Body() dto: BookDto,
  ): Promise<Book> {
    return this.bookService.updateBookId(id, dto);
  }

  @Delete('books/:id')
  async deleteBookById(@Param('id') id: number): Promise<Book> {
    return this.bookService.deleteBookById(id);
  }
}
