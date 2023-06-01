import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitDto, SearchProduitDto } from './dto';
import { Produit } from './types';

@Controller()
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Get('produit')
  async getProduits(): Promise<Produit[]> {
    return await this.produitService.getProduits();
  }

  @Get('mouvement')
  async getMouvementStock() {
    return await this.produitService.getMouvementStock();
  }

  @Get('produit/:id')
  async getProduitById(@Param('id') id: number): Promise<Produit> {
    return await this.produitService.getProduitById(id);
  }

  @Post('produit')
  async createProduit(@Body() dto: ProduitDto): Promise<Produit> {
    return this.produitService.createProduit(dto);
  }

  @Post('search')
  async searchProduit(@Body() dto: SearchProduitDto) {
    return await this.produitService.searchProduit(dto);
  }

  @Put('produit/:id')
  async updateProduitById(
    @Param('id') id: number,
    @Body() dto: ProduitDto,
  ): Promise<Produit> {
    return this.produitService.updateProduitById(id, dto);
  }

  @Delete('produit/:id')
  async deleteProduitById(@Param('id') id: number): Promise<Produit> {
    return this.produitService.deleteProduitById(id);
  }
}
