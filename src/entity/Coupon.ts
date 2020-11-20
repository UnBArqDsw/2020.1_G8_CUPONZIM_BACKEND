import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Lot } from './Lot'
import { Shop} from './Shop'

@Entity()
export class Coupon {
   @PrimaryGeneratedColumn()
   idCoupon: number;

   @Column()
   is_used: boolean;

   @ManyToOne(type => Lot, lot => lot.coupons)
   lot: Lot;

   @OneToMany(type => Shop, shop=>shop.lots)
   shop:Shop;
}
