import { categorys } from "@/constants/category";
import { Button } from "./ui/button";
import { useEffect } from "react";

export default function TicCard({
    text,
    turn,
    categorySelected,
    index ,
    setTurn,
    setGame,
    isWon,
    handleWon,
    setIsWon
}:{
    text:string,
    turn: number,
    categorySelected :string[]
}){
    const calculateRandom=()=>{
        return Math.floor(4*Math.random());
    }
    
    const handleClick=()=>{
        const random = calculateRandom();
        const emoji = categorys.find((category)=>category.name==categorySelected[turn-1])?.emoji;
        if(!text || ! emoji?.includes(text)){
            
            setGame((prevGame : string[])=>{
                const game = prevGame;
                game[index] = emoji?emoji[random]:"";
                console.log(game)
                return [...game];
            })
            
            
            
        }
    }
    return(
        <div className="w-20 h-20 border-2 border-amber-400" onClick={isWon ? undefined : handleClick}>
            {text}
        </div>
        
    )
}