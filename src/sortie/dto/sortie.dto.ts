import { IsNotEmpty, IsNumber } from 'class-validator';

export class SortieDto {
  @IsNotEmpty()
  numProduit: number;

  @IsNotEmpty()
  @IsNumber()
  qteSortie: number;
}
