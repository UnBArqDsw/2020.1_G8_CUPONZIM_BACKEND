import {Entity, PrimaryGeneratedColumn, Column,ManyToOne,OneToMany} from "typeorm"; 
import {Shop} from "./Shop"
import {Coupon} from "./Coupon"

@Entity() 
export class Lot {   
   @PrimaryGeneratedColumn() 
   idLot: number; 
   
   @Column("varchar",{length:200}) 
   description_lot_coupon: string; 
   
   @Column({type:"decimal"}) 
   original_price: number; 
   
   @Column({type:"decimal"}) 
   discount_price: number;
   
   @Column()
   expiration_date: string;
   
   @OneToMany(()=>Coupon,coupon => coupon.lot)
   coupons: Coupon[];

   @ManyToOne(()=>Shop,shop => shop.lots)
   shop : Shop;
}