import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public guildId: string;

  @ManyToOne(() => Category, (category) => category.roles, {
    onDelete: 'CASCADE',
  })
  public attachedCategory: Category;

  @Column()
  public name: string;

  @Column()
  public emoji: string;

  constructor(init?: Partial<Role>) {
    Object.assign(this, init);
  }
}
