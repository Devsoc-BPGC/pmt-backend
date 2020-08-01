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

export enum CardStatus {
   ONGOING = 'ongoing',
   TODO = 'todo',
   COMPLETED = 'completed'
}

@Entity({name: 'cards'})
export class Card {
	@PrimaryGeneratedColumn()
   id: number | undefined;

   @Column('text')
   title: string | undefined;

   @Column('text')
   description: string | undefined;

   @CreateDateColumn()
   created_at: Timestamp | undefined;

   @UpdateDateColumn()
   updated_at: Timestamp | undefined;

   @ManyToOne((type) => Taskboard, board => board.cards)
   board: Taskboard | undefined;

   @ManyToOne((type) => Users)
   @JoinColumn()
   created_by: Users | undefined;

   @Column('text', { array: true, nullable: true })
   labels: string[] | undefined;

   @Column({
      type: 'enum',
      enum: CardStatus,
      default: CardStatus.TODO
   })
   card_status: CardStatus | undefined;

   @ManyToMany(type => Users, user => user.cards)
   @JoinTable()
   members: Users[] | undefined;

   @Column({
      type: 'timestamp',
      nullable: true
   })
   completed_at: Timestamp | undefined;

   @Column('timestamp')
   deadline: Timestamp | undefined;
}
