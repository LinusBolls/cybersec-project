import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from 'typeorm';
import type { Relation } from "typeorm";
import { User } from './User';

@Entity()
export class Box {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @ManyToOne(() => User, user => user.boxes)
    author!: Relation<User>;
}