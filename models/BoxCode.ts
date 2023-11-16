import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn
} from 'typeorm';
import type { Relation } from "typeorm";
import { Box } from './Box';

@Entity()
export class BoxCode {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  html!: string;

  @Column("text")
  css!: string;

  @Column("text")
  js!: string;

  @OneToOne(() => Box)
  @JoinColumn()
  box!: Relation<Box>;
}
