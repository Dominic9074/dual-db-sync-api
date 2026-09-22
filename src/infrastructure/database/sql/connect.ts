import { appDataSource } from "./data-source";

export const connectMySQL=async ()=>{
    try{
        await appDataSource.initialize();

        console.log('Mysql Connected successfully')
    }catch(error){
        console.log('MySQL connection failed',error);
        throw error;
    }
}
