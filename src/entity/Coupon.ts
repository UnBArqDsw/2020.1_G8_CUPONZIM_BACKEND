import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Lot } from './Lot'

@Entity()
export class Coupon {
   @PrimaryGeneratedColumn()
   idCoupon: number;

   @Column()
   is_used: boolean;

   @ManyToOne(() => Lot, lot => lot.coupons)
   lot: Lot;
}
