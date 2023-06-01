import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { EntreeDto } from './dto';
import { Entree, EntreeProduit } from './types';

@Injectable()
export class EntreeService {
  constructor(private dbService: DBService) {}

  async getEntreeById(id: number): Promise<Entree | null> {
    return await this.dbService.bondeentree.findUnique({
      where: {
        numBondeEntree: Number(id),
      },
      select: {
        numBondeEntree: true,
        numProduit: true,
        qteEntree: true,
        dateEntree: true,
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

  async getEntrees(): Promise<Entree[]> {
    return await this.dbService.bondeentree.findMany({
      select: {
        numBondeEntree: true,
        numProduit: true,
        qteEntree: true,
        dateEntree: true,
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

  async createEntree(dto: EntreeDto): Promise<EntreeProduit> {
    const entree = await this.dbService.bondeentree.create({
      data: {
        numProduit: Number(dto.numProduit),
        qteEntree: Number(dto.qteEntree),
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

    const newStock = stock.stock + Number(dto.qteEntree);

    const produit = await this.dbService.produit.update({
      data: {
        stock: Number(newStock),
      },
      where: {
        numProduit: Number(dto.numProduit),
      },
    });

    return [entree, produit];
  }

  async updateEntreeById(id: number, dto: EntreeDto): Promise<EntreeProduit> {
    const quantity = await this.dbService.bondeentree.findUnique({
      where: {
        numBondeEntree: Number(id),
      },
      select: {
        numProduit: true,
        qteEntree: true,
        produit: {
          select: {
            stock: true,
          },
        },
      },
    });

    if (
      quantity.qteEntree < dto.qteEntree ||
      quantity.qteEntree > dto.qteEntree
    ) {
      const newStock =
        Number(quantity.produit.stock) -
        Number(quantity.qteEntree) +
        Number(dto.qteEntree);

      const produit = await this.dbService.produit.update({
        data: {
          stock: Number(newStock),
        },
        where: {
          numProduit: Number(quantity.numProduit),
        },
      });

      const entree = await this.dbService.bondeentree.update({
        data: {
          numProduit: Number(dto.numProduit),
          qteEntree: Number(dto.qteEntree),
        },
        where: {
          numBondeEntree: Number(id),
        },
      });

      return [entree, produit];
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

    const entree = await this.dbService.bondeentree.update({
      data: {
        numProduit: Number(dto.numProduit),
        qteEntree: Number(dto.qteEntree),
      },
      where: {
        numBondeEntree: Number(id),
      },
    });

    return [entree, produit];
  }

  async deleteEntreeById(id: number): Promise<EntreeProduit> {
    const quantity = await this.dbService.bondeentree.findUnique({
      where: {
        numBondeEntree: Number(id),
      },
      select: {
        numProduit: true,
        qteEntree: true,
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

    const newStock = stock.stock - Number(quantity.qteEntree);

    const produit = await this.dbService.produit.update({
      data: {
        stock: Number(newStock),
      },
      where: {
        numProduit: Number(quantity.numProduit),
      },
    });

    const entree = await this.dbService.bondeentree.delete({
      where: {
        numBondeEntree: Number(id),
      },
    });

    return [entree, produit];
  }
}
