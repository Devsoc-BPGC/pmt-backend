import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
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

@Entity({ name: 'cards' })
@ObjectType()
export class Card {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id!: number;

	@Column('text')
	@Field()
	title!: string;

	@Column('text')
	@Field()
	description!: string;

	@CreateDateColumn()
	@Field()
	created_at!: Date;

	@UpdateDateColumn()
	@Field()
	updated_at!: Date;

	@ManyToOne((type) => Taskboard, board => board.cards)
	board!: Taskboard;

	@ManyToOne((type) => Users, user => user.created_cards)
	created_by!: Users;

	@Column('text', { array: true, nullable: true })
	@Field(() => [String], {
		nullable: true
	})
	labels?: string[];

	@Column('text', { array: true, nullable: true })
	@Field(() => [String], {
		nullable: true
	})
	label_colors?: string[];

	@Column('text', { array: true, nullable: true })
	@Field(() => [String], {
		nullable:true
	})
	tasks?: string[];

	@Column('boolean', { array: true, nullable: true })
	@Field(() => [Boolean], {
		nullable:true
	})
	task_status?: boolean[];

	@Column({
		type: 'enum',
		enum: CardStatus,
		default: CardStatus.TODO
	})
	@Field()
	card_status!: CardStatus;

	@ManyToMany(type => Users, user => user.cards)
	@JoinTable()
	members?: Users[];

	@Column({
		type: 'timestamp',
		nullable: true
	})
	@Field()
	completed_at?: string;

	@Column('timestamp')
	@Field()
	deadline!: string;

	@Column('text')
	@Field()
	background!: string;
}
