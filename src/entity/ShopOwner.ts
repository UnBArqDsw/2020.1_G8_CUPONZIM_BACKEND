import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm'
import { Shop } from './Shop'
@Entity()
export class ShopOwner {
   @PrimaryGeneratedColumn()
   idShopOwner: number;

   @Column('varchar', { unique: true, length: 50 })
   username_shop: string;

   @Column('varchar', { length: 50 })
   password_shop: string;

   @OneToMany(type => Shop, shop => shop.owner, { eager: true })
   @JoinTable()
   shops: Shop[]
}
