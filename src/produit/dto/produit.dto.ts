import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProduitDto {
  @IsNotEmpty()
  @IsString()
  design: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}

export class SearchProduitDto {
  searchkey: string;
}
