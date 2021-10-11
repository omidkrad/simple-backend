import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
} from "class-validator";

export class CreateProductDto {
    
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsString()
  serialNumber!: string;

  @IsInt()
  inventory!: number;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

}
