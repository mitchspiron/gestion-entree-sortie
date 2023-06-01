import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SortieService } from './sortie.service';
import { Sortie, SortieProduit } from './types';
import { SortieDto } from './dto';

@Controller()
export class SortieController {
  constructor(private readonly sortieService: SortieService) {}

  @Get('sortie')
  async getSorties(): Promise<Sortie[]> {
    return await this.sortieService.getSorties();
  }

  @Get('sortie/:id')
  async getSortieById(@Param('id') id: number): Promise<Sortie> {
    return await this.sortieService.getSortieById(id);
  }

  @Post('sortie')
  async createSortie(@Body() dto: SortieDto): Promise<SortieProduit> {
    return this.sortieService.createSortie(dto);
  }

  @Put('sortie/:id')
  async updateSortieById(
    @Param('id') id: number,
    @Body() dto: SortieDto,
  ): Promise<SortieProduit> {
    return this.sortieService.updateSortieById(id, dto);
  }

  @Delete('sortie/:id')
  async deleteSortieById(@Param('id') id: number): Promise<SortieProduit> {
    return this.sortieService.deleteSortieById(id);
  }
}
