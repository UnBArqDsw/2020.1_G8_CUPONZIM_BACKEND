import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Shop } from './Shop'
@Entity()
export class Client {
   @PrimaryGeneratedColumn()
   idClient: number;

   @Column('varchar', { unique: true, length: 50 })
   username_client: string;

   @Column('varchar', { length: 50 })
   password_client: string;

   @Column('varchar', { length: 50 })
   avatar_img_client: string;

   @Column()
   cellphone_number_client: number;

   @ManyToMany(type => Shop,{ eager: true })
   @JoinTable()
   favorite_shop_client: Shop[]
}
