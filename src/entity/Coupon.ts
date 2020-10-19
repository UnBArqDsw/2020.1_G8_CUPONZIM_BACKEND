import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity() 
export class Coupon {   
   @PrimaryGeneratedColumn() 
   idCoupon: number; 
   
   @Column() 
   is_used: boolean; 
   
}