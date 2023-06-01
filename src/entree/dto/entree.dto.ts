import { IsNotEmpty, IsNumber } from 'class-validator';

export class EntreeDto {
  @IsNotEmpty()
  numProduit: number;

  @IsNotEmpty()
  @IsNumber()
  qteEntree: number;
}
