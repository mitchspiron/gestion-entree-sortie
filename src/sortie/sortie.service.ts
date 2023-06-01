import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { Sortie, SortieProduit } from './types';
import { SortieDto } from './dto';

@Injectable()
export class SortieService {
  constructor(private dbService: DBService) {}

  async getSortieById(id: number): Promise<Sortie | null> {
    return await this.dbService.bondesortie.findUnique({
      where: {
        numBondeSortie: Number(id),
      },
      select: {
        numBondeSortie: true,
        numProduit: true,
        qteSortie: true,
        dateSortie: true,
        produit: {
          select: {
            numProduit: true,
            design: true,
            stock: true,
          },
        },
      },
    });
  }

  async getSorties(): Promise<Sortie[]> {
    return await this.dbService.bondesortie.findMany({
      select: {
        numBondeSortie: true,
        numProduit: true,
        qteSortie: true,
        dateSortie: true,
        produit: {
          select: {
            numProduit: true,
            design: true,
            stock: true,
          },
        },
      },
    });
  }

  async createSortie(dto: SortieDto): Promise<SortieProduit> {
    const sortie = await this.dbService.bondesortie.create({
      data: {
        numProduit: Number(dto.numProduit),
        qteSortie: Number(dto.qteSortie),
      },
    });

    const stock = await this.dbService.produit.findUnique({
      where: {
        numProduit: Number(dto.numProduit),
      },
      select: {
        numProduit: true,
        stock: true,
      },
    });

    const newStock = stock.stock - Number(dto.qteSortie);

    const produit = await this.dbService.produit.update({
      data: {
        stock: Number(newStock),
      },
      where: {
        numProduit: Number(dto.numProduit),
      },
    });

    return [sortie, produit];
  }

  async updateSortieById(id: number, dto: SortieDto): Promise<SortieProduit> {
    const quantity = await this.dbService.bondesortie.findUnique({
      where: {
        numBondeSortie: Number(id),
      },
      select: {
        numProduit: true,
        qteSortie: true,
        produit: {
          select: {
            stock: true,
          },
        },
      },
    });

    if (
      quantity.qteSortie < dto.qteSortie ||
      quantity.qteSortie > dto.qteSortie
    ) {
      const newStock =
        Number(quantity.produit.stock) +
        Number(quantity.qteSortie) -
        Number(dto.qteSortie);

      const produit = await this.dbService.produit.update({
        data: {
          stock: Number(newStock),
        },
        where: {
          numProduit: Number(quantity.numProduit),
        },
      });

      const sortie = await this.dbService.bondesortie.update({
        data: {
          numProduit: Number(dto.numProduit),
          qteSortie: Number(dto.qteSortie),
        },
        where: {
          numBondeSortie: Number(id),
        },
      });

      return [sortie, produit];
    }

    const produit = await this.dbService.produit.findUnique({
      where: {
        numProduit: Number(quantity.numProduit),
      },
      select: {
        numProduit: true,
        design: true,
        stock: true,
      },
    });

    const sortie = await this.dbService.bondesortie.update({
      data: {
        numProduit: Number(dto.numProduit),
        qteSortie: Number(dto.qteSortie),
      },
      where: {
        numBondeSortie: Number(id),
      },
    });

    return [sortie, produit];
  }

  async deleteSortieById(id: number): Promise<SortieProduit> {
    const quantity = await this.dbService.bondesortie.findUnique({
      where: {
        numBondeSortie: Number(id),
      },
      select: {
        numProduit: true,
        qteSortie: true,
      },
    });

    const stock = await this.dbService.produit.findUnique({
      where: {
        numProduit: Number(quantity.numProduit),
      },
      select: {
        numProduit: true,
        stock: true,
      },
    });

    const newStock = stock.stock + Number(quantity.qteSortie);

    const produit = await this.dbService.produit.update({
      data: {
        stock: Number(newStock),
      },
      where: {
        numProduit: Number(quantity.numProduit),
      },
    });

    const sortie = await this.dbService.bondesortie.delete({
      where: {
        numBondeSortie: Number(id),
      },
    });

    return [sortie, produit];
  }
}
