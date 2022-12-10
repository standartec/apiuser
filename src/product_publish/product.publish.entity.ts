import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_publish')
export default class ProductPublish {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    id_product_customer: number;

    @Column()
    id_publish: number;

    @Column()
    product_price: number;

    @Column()
    date: Date;

    @Column()
    status: number;

    @Column()
    dt_status: Date;
}


function PrimaryColumn() {
  throw new Error("Function not implemented.");
}
