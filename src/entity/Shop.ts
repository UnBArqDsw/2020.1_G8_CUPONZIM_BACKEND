import {Entity, PrimaryGeneratedColumn, Column,ManyToOne,OneToMany} from "typeorm"; 
import {Location} from "./Location"
import {Lot} from "./Lot"

@Entity() 
export class Shop {   
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

   @ManyToOne(()=>Location,location => location.shops)
   location : Location;
   
   @OneToMany(()=>Lot,lot => lot.shop)
   lots: Lot[];
   
   
}