import { categorys } from "@/constants/constants";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";

type OrderType = Array<Array<{ emoji: string; index: number }>>;
export default function TicCard({
    text,
    turn,
    categorySelected,
    index ,
    setGame,
    isWon,
    setOrder,
    order
}:{
    text:string,
    turn: number,
    categorySelected :string[],
    index :number,
    setGame : Dispatch<SetStateAction<string[]>>,
    isWon : boolean,
    setOrder : Dispatch<SetStateAction<OrderType>>,
    order : Array<Array<{emoji: string ,index: number }>>
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
            setOrder((prevOrder : OrderType)=>{
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
        <div className={cn("w-20 h-20 border-2 m-0.5 p-15 rounded-2xl flex items-center justify-center",!text?"bg-[#D5BEF2]":(categorys.find((category)=>category.name==categorySelected[0])?.emoji.includes(text)?"bg-[#BA87FE]":"bg-[#FBED2C]"))} onClick={isWon ? undefined : handleClick}>
            <span className="text-4xl font-bold ">
                {text}
            </span>
        </div>
        
    )
}