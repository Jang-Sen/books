import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsString()
  @ApiProperty({
    example: 20000,
    description: '책 가격',
  })
  price: number;

  @IsString()
  @ApiProperty({
    example: 10,
    description: '책 재고',
  })
  stock: number;
}
