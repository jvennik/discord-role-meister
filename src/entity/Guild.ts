import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Guild {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public guildId: string;

  @Column({ type: 'varchar', name: 'boundChannelId', nullable: true })
  public boundChannelId: string;

  constructor(init?: Partial<Guild>) {
    Object.assign(this, init);
  }
}
