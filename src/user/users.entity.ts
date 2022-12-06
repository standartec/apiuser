import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  ip_address: number;

  @Column('text')
  email: string;

  @Column('int')
  created_on: number;

  @Column('text')
  first_name: string;

  @Column('text')
  company: string;

  @Column('text')
  phone: string;

  @Column('text')
  password: string;
}