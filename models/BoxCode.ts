import {
    Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn
  } from 'typeorm';
  import { Box } from './Box';
  
  @Entity()
  export class Code {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column("text")
    html!: string;
  
    @Column("text")
    css!: string;
  
    @Column("text")
    js!: string;
  
    @OneToOne(() => Box)
    @JoinColumn()
    box!: Box;
  }
  