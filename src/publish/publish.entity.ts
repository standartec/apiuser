import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('publish')
export default class Publish {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    id_user: number;

    @Column()
    id_template: number;

    @Column()
    status: number;

    @Column()
    header2: string;
}

function PrimaryColumn() {
  throw new Error("Function not implemented.");
}
