import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name!: string;

  @Type()
  @IsInt()
  price!: number;
}
