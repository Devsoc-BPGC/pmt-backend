import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
   Timestamp,
   ManyToOne,
   JoinColumn,
   ManyToMany,
   JoinTable
} from 'typeorm';

import { Taskboard } from './Taskboard';
import { Users } from './User';

import { ObjectType, Field, ID } from 'type-graphql';

export enum CardStatus {
   ONGOING = 'ongoing',
   TODO = 'todo',
   COMPLETED = 'completed'
}

@Entity({name: 'cards'})
@ObjectType()
export class Card {
   @PrimaryGeneratedColumn()
   @Field(() => ID)
   id?: number;

   @Column('text')
   @Field()
   title?: string;

   @Column('text')
   @Field()
   description?: string;

   @CreateDateColumn()
   @Field()
   created_at?: Date;

   @UpdateDateColumn()
   @Field()
   updated_at?: Date;

   @ManyToOne((type) => Taskboard, board => board.cards)
   @Field(() => Taskboard)
   board?: Taskboard;

   @ManyToOne((type) => Users)
   @JoinColumn()
   @Field(() => Users)
   created_by?: Users;

   @Column('text', { array: true, nullable: true })
   @Field(() => [String])
   labels?: string[];

   @Column({
      type: 'enum',
      enum: CardStatus,
      default: CardStatus.TODO
   })
   @Field()
   card_status?: CardStatus;

   @ManyToMany(type => Users, user => user.cards)
   @JoinTable()
   @Field(() => [Users])
   members?: Users[];

   @Column({
      type: 'timestamp',
      nullable: true
   })
   @Field()
   completed_at?: Date;

   @Column('timestamp')
   @Field()
   deadline?: Date;
}
