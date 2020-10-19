import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity() 
export class Client {   
   @PrimaryGeneratedColumn() 
   idClient: number; 
   
   @Column("varchar",{length:50}) 
   username_client: string; 
   
   @Column("varchar",{length:50}) 
   password_client: string; 
   
   @Column("varchar",{length:50}) 
   avatar_img_client: string;    

   @Column() 
   cellphone_number_client: number;
   
   
}