import { Injectable, ForbiddenException } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { ProduitDto, SearchProduitDto } from './dto';
import { Produit } from './types';

@Injectable()
export class ProduitService {
  constructor(private dbService: DBService) {}

  async getProduitById(id: number): Promise<Produit | null> {
    return await this.dbService.produit.findUnique({
      where: {
        numProduit: Number(id),
      },
    });
  }

  async getProduits(): Promise<Produit[]> {
    return await this.dbService.produit.findMany();
  }

  async getMouvementStock() {
    return await this.dbService.$queryRaw`
    SELECT CONCAT('BS','',bondesorties.numBondeSortie) AS bon, bondesorties.numProduit, bondesorties.qteSortie, bondesorties.dateSortie FROM bondesorties UNION
    SELECT CONCAT('BE','',bondeentrees.numBondeEntree) AS bon, bondeentrees.numProduit, bondeentrees.qteEntree, bondeentrees.dateEntree FROM bondeentrees
    `;
  }

  async createProduit(dto: ProduitDto): Promise<Produit> {
    return await this.dbService.produit.create({
      data: {
        design: dto.design,
        stock: Number(dto.stock),
      },
    });
  }

  async updateProduitById(id: number, dto: ProduitDto): Promise<Produit> {
    return await this.dbService.produit.update({
      data: {
        design: dto.design,
        stock: Number(dto.stock),
      },
      where: {
        numProduit: Number(id),
      },
    });
  }

  async deleteProduitById(id: number): Promise<Produit> {
    return await this.dbService.produit.delete({
      where: {
        numProduit: Number(id),
      },
    });
  }

  async searchProduit(dto: SearchProduitDto): Promise<Produit[]> {
    const produit = await this.dbService.produit.findMany({
      orderBy: {
        numProduit: 'desc',
      },
      where: {
        OR: [
          {
            numProduit: Number(dto.searchkey) || 0,
          },
          {
            design: {
              contains: dto.searchkey,
            },
          },
        ],
      },
    });

    if (produit.length == 0) {
      throw new ForbiddenException("Il n'y a aucun produit trouvé!");
    }

    return produit;
  }
}
