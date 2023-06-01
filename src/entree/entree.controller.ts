import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EntreeService } from './entree.service';
import { Entree, EntreeProduit } from './types';
import { EntreeDto } from './dto';

@Controller()
export class EntreeController {
  constructor(private readonly entreeService: EntreeService) {}

  @Get('entree')
  async getEntrees(): Promise<Entree[]> {
    return await this.entreeService.getEntrees();
  }

  @Get('entree/:id')
  async getEntreeById(@Param('id') id: number): Promise<Entree> {
    return await this.entreeService.getEntreeById(id);
  }

  @Post('entree')
  async createEntree(@Body() dto: EntreeDto): Promise<EntreeProduit> {
    return this.entreeService.createEntree(dto);
  }

  @Put('entree/:id')
  async updateEntreeById(
    @Param('id') id: number,
    @Body() dto: EntreeDto,
  ): Promise<EntreeProduit> {
    return this.entreeService.updateEntreeById(id, dto);
  }

  @Delete('entree/:id')
  async deleteEntreeById(@Param('id') id: number): Promise<EntreeProduit> {
    return this.entreeService.deleteEntreeById(id);
  }
}
