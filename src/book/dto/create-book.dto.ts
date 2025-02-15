import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @ApiProperty({
    example: '내가 원하는 것을 나도 모를 때',
    description: '책 제목',
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: '전승환',
    description: '저자',
  })
  author: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    example: 20000,
    description: '책 가격',
    type: 'number',
  })
  price: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    example: 10,
    description: '책 재고',
    type: 'number',
  })
  stock: number;
}
