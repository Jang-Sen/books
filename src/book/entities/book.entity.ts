import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entities/base.entity';

@Entity()
export class Book extends Base {
  @Column()
  public title: string;

  @Column()
  public author: string;

  @Column()
  public price: number;

  @Column()
  public stock: number;
}
