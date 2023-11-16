import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne
} from 'typeorm';
import type { Relation } from "typeorm";
import { User } from './User';
import { BoxCode } from './BoxCode';
import BoxState from '@/boxState';

@Entity()
export class Box {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @ManyToOne(() => User, user => user.boxes, { eager: true })
    author!: Relation<User>;

    @OneToOne(() => BoxCode, boxCode => boxCode.box, { eager: true })
    boxCode!: BoxCode;

    @Column({
        type: "enum",
        enum: BoxState,
        default: BoxState.DRAFT
      })
    state!: typeof BoxState[keyof typeof BoxState];
}