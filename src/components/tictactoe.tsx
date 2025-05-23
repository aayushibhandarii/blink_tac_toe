import { useEffect, useState } from "react";
import TicCard from "./ticCard";
import { categorys } from "@/constants/category";

export default function Tictactoe({categorySelected}:{categorySelected  :string[]}){
    const [game,setGame] = useState([...Array(9)]);
    const [turn ,setTurn] = useState(1);
    const [isWon,setIsWon] = useState(false);
    useEffect(()=>{
            const emoji = categorys.find((category)=>category.name==categorySelected[turn-1])?.emoji;
            if(handleWon(emoji)){
                setIsWon(true)
            }else{
                setTurn((prevTurn:number)=>{
                    return prevTurn===2?1:2
                })
            }
    },[game])
    const handleWon=(emoji:string[])=>{
        //horizontal
        console.log("YOO")
        let count:number =0;
        for(let i=0;i<9;i++){
            if(i%3==0){
                if(count==3){
                    return true;
                }
                count =0;
            }
            if(game[i] && emoji.includes(game[i])){
                    count++;
            }
        }
        //vertical
        count=0;
        for(let i=0;i<3;i++){
            
            
            count=0;
            for(let j=i;j<9;j+=3){
                console.log(game[j])
                if(game[j] && emoji.includes(game[j])){
                    count++;
                }
            }
            console.log(count +" "+emoji)
            if(count==3){
                return true;
            }
        }
        //diagonal 1
        count =0;
        [0,4,8].forEach((i)=>{
            if(game[i] && emoji.includes(game[i])){
                    count++;
            }
        })
        if(count==3){
            return true;
        }
        //diagonal 3
        count =0;
        [2,4,6].forEach((i)=>{
            if(game[i] && emoji.includes(game[i])){
                    count++;
            }
        })
        if(count==3){
            return true;
        }
        return false;
    }
    return(
        <>
        {
            isWon?<h1>Player {turn}</h1>:null
        }
        <div className="grid grid-cols-3 gap-0">
            {
                game.map((_,i)=><TicCard key={i} index={i} text={_} turn={turn} setGame={setGame} setTurn={setTurn} isWon={isWon}setIsWon={setIsWon} handleWon={handleWon}categorySelected={categorySelected}/>)
            }
        </div>
            
        </>
    )
}
