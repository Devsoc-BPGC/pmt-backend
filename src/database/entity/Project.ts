import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	Timestamp,
	OneToMany,
	ManyToMany,
	JoinTable,
	BaseEntity
} from 'typeorm';
import { Users } from './User';
import { Taskboard } from './Taskboard';

import { ObjectType, Field, ID } from 'type-graphql';

@Entity({name: 'projects'})
@ObjectType()
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id!: number;

    @Column({
      type: 'varchar',
      unique: true
	})
	@Field()
	name!: string;

	@Column('text')
	@Field()
	description!: string;

	// @Column('int')
	// @Field()
	// chat_channel_id?: number;

	// @Column({
	// 	type: 'int'
	// })
	// // @Field()
	// created_by_id!: number;

	@ManyToOne((type) => Users)
	@JoinColumn()
	// @Field(() => Users)
	created_by!: Users;

	@OneToMany((type) => Taskboard, taskboard => taskboard.project)
	// @Field(() => [Taskboard])
	boards?: Taskboard[];

	@CreateDateColumn({ nullable: false })
	@Field()
	created_time?: Date;

	@UpdateDateColumn({ nullable: false })
	@Field()
	updated_time?: Date;

	@ManyToMany((type) => Users, user => user.projects)
	@JoinTable()
	// @Field(() => [Users])
	members?: Users[];
}
