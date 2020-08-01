import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	Timestamp,
	ManyToOne,
   JoinColumn,
   ManyToMany,
   JoinTable,
   OneToMany
} from 'typeorm';

import { Project } from './Project';
import { Users } from './User';
import { Card } from './Card';

@Entity({ name: 'taskboards'})
export class Taskboard {
	@PrimaryGeneratedColumn()
	id: number | undefined;

	@Column('varchar')
	name: string | undefined;

	@Column('text')
	description: string | undefined;

	@Column('text')
	github_repo_url: string | undefined;

	@CreateDateColumn()
	created_at: Timestamp | undefined;

	@UpdateDateColumn()
	updated_at: Timestamp | undefined;

	@Column('int')
	chat_channel_id: number | undefined;

	@ManyToOne((type) => Project, project => project.boards)
   project: Project | undefined;

   @ManyToOne((type) => Users)
   @JoinColumn()
   created_by: Users | undefined;

   @ManyToMany(type => Users, user => user.boards)
   @JoinTable()
   members: Users[] | undefined;

   @OneToMany(type => Card, card => card.board)
   cards: Card[] | undefined;

}
