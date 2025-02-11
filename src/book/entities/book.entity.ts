import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entities/base.entity';

@Entity()
export class Book extends Base {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  price: number;

  @Column()
  stock: number;
}
