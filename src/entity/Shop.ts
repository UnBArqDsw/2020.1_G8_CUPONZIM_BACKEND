import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Location } from './Location'
import { Lot } from './Lot'
import { ShopOwner } from './ShopOwner'

@Entity()
export class Shop {
   [x: string]: ShopOwner[];
   @PrimaryGeneratedColumn()
   idShop: number;

   @Column('varchar', { length: 50 })
   name_shop: string;

   @Column('varchar', { length: 200 })
   description_shop: string;

   @Column({ type: 'decimal' })
   long_location: number;

   @Column('varchar', { length: 50 })
   type_location: string;

   @ManyToOne(type => Location, location => location.shops)
   location: Location;

   @ManyToOne(type => ShopOwner, owner => owner.shops)
   owner: ShopOwner;

   @OneToMany(type => Lot, lot => lot.shop, { eager: true })
   lots: Lot[];
}
