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
	JoinTable
} from 'typeorm';
import { Users } from './User';
import { Taskboard } from './Taskboard';

@Entity({name: 'projects'})
export class Project {
	@PrimaryGeneratedColumn()
	id: number | undefined;

   @Column({
      type: 'varchar',
      unique: true
   })
	name: string | undefined;

	@Column('text')
	description: string | undefined;

	@Column('int')
	chat_channel_id: number | undefined;

	@Column({
		type: 'int',
		unique: true
	})
	created_by_id: number | undefined;

	@ManyToOne((type) => Users)
	@JoinColumn()
	created_by: Users | undefined;

	@OneToMany((type) => Taskboard, taskboard => taskboard.project)
	boards: Taskboard[] | undefined;

	@CreateDateColumn()
	created_time: Timestamp | undefined;

	@UpdateDateColumn()
	updated_time: Timestamp | undefined;

	@ManyToMany((type) => Users, user => user.projects)
	@JoinTable()
	members: Users[] | undefined;
}
