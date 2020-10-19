import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity() 
export class Location {   
   @PrimaryGeneratedColumn() 
   idShop: number; 
   
   @Column("varchar",{length:50}) 
   name_shop: string; 
   
   @Column("varchar",{length:200}) 
   description_shop: string; 
   
   @Column({type:"decimal"}) 
   long_location: number;
   
   @Column("varchar",{length:50}) 
   type_location: string;
   
}