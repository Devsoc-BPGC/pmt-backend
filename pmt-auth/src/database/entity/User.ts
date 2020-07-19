import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {

	@PrimaryGeneratedColumn()
	id: number | undefined;

	@Column('text')
	firstName: string | undefined;

	@Column('text')
	lastName: string | undefined;

	@Column('int')
	age: number | undefined;

}
