import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { Role } from './Role';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public guildId: string;

  @Column()
  public slug: string;

  @Column()
  public message: string;

  @OneToMany(() => Role, (role) => role.attachedCategory)
  public roles: Role[];

  constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}
