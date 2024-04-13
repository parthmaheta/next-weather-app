import convert from "convert-units";

export const convertTemp=(isKelvin:boolean,val:number)=>{
    return !isKelvin ? convert(val).from("K").to('C').toFixed(2).toString().concat(' C'):val.toString().concat(' K')
}