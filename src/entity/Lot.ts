import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

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
   
}