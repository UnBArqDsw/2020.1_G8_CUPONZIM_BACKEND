import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity() 
export class Location {   
   @PrimaryGeneratedColumn() 
   idLocation: number; 
   
   @Column("varchar",{length:50}) 
   name_location: string; 
   
   @Column({type:"decimal"}) 
   lat_location: number; 
   
   @Column({type:"decimal"}) 
   long_location: number;
   
   @Column("varchar",{length:50}) 
   type_location: string;
   
}