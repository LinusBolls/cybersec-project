import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import type {Relation} from "typeorm";
import { User } from './User';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  token!: string;

  @Column()
  expiryDate!: Date;

  @ManyToOne(() => User, user => user.refreshTokens)
  user!: Relation<User>;
}
