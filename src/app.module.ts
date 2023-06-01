import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBService } from './db.service';
import { ProduitController } from './produit/produit.controller';
import { ProduitService } from './produit/produit.service';
import { EntreeController } from './entree/entree.controller';
import { EntreeService } from './entree/entree.service';
import { SortieController } from './sortie/sortie.controller';
import { SortieService } from './sortie/sortie.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProduitController,
    EntreeController,
    SortieController,
  ],
  providers: [
    AppService,
    DBService,
    ProduitService,
    EntreeService,
    SortieService,
  ],
})
export class AppModule {}
