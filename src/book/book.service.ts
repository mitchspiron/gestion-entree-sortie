import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { BookDto } from './dto';
import { Book } from './types';

@Injectable()
export class BookService {
  constructor(private dbService: DBService) {}

  async getBookById(id: number): Promise<Book | null> {
    return await this.dbService.book.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async getBooks() {
    return await this.dbService.book.findMany();
  }

  async createBook(dto: BookDto): Promise<Book> {
    return await this.dbService.book.create({
      data: {
        title: dto.title,
        author: dto.author,
        publishYear: Number(dto.publishYear),
      },
    });
  }

  async updateBookId(id: number, dto: BookDto): Promise<Book> {
    return await this.dbService.book.update({
      data: {
        title: dto.title,
        author: dto.author,
        publishYear: Number(dto.publishYear),
      },
      where: {
        id: Number(id),
      },
    });
  }

  async deleteBookById(id: number): Promise<Book> {
    return await this.dbService.book.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
