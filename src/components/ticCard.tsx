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
    setIsWon,
    setOrder,
    order
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
            const randomEmoji:string = emoji?emoji[random]:""
            setGame((prevGame:string[])=>{
                const game = [...prevGame]
                game[index]= randomEmoji;
                if(order[turn-1].length ===3){
                    game[order[turn-1][0].index] = "";
                }
                
                return [...game]
            })
            setOrder((prevOrder)=>{
                const newOrder = [...prevOrder[turn-1]];
                newOrder.push({emoji:randomEmoji,index: index});
                if(newOrder.length >3){
                    
                    newOrder.splice(0,1);
                }
                
                if(turn==1){
                    return [[...newOrder],[...prevOrder[1]]]
                }else{
                    return [[...prevOrder[0]],[...newOrder]]
                }
            })
            
        }
    }
    return(
        <div className="w-20 h-20 border-2 border-amber-400" onClick={isWon ? undefined : handleClick}>
            {text}
        </div>
        
    )
}