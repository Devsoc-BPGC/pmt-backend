import { Entity, PrimaryGeneratedColumn , Column , BaseEntity} from 'typeorm';
import { ObjectType, Field, ID} from 'type-graphql';
// import { parentPort } from "worker_threads";

@ObjectType()
@Entity()
export class NewProject extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column('text', { unique: true })
    projectName!: string;
}
