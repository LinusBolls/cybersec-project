import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { RefreshToken } from './RefreshToken';
import Permission from '@/permissions';
import { Box } from './Box';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column()
  passwordHash!: string;

  @Column("simple-array")
  permissions!: typeof Permission[keyof typeof Permission][];

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens!: RefreshToken[];

  @OneToMany(() => Box, box => box.author)
  boxes!: Box[];
}
