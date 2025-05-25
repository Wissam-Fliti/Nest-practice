import { IsOptional, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  limit?: number;

  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page?: number;
}