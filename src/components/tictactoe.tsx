import { useEffect, useState } from "react";
import TicCard from "./ticCard";
import { categorys, handleWon } from "@/constants/constants";
import { cn } from "@/lib/utils";

import WinningCard from "./winningCard";

export default function Tictactoe({categorySelected}:{categorySelected  :string[]}){
    const [game,setGame] = useState<string[]>([...Array(9)]);
    const [turn ,setTurn] = useState(1);
    const [order,setOrder] = useState<Array<Array<{emoji: string ,index: number }>>>([[],[]]);
    const [isWon,setIsWon] = useState(false);
    const [score,setScore] = useState([0,0]);
    useEffect(()=>{
            const emoji : string[] | undefined = categorys.find((category)=>category.name==categorySelected[turn-1])?.emoji;
            if(handleWon(emoji,game)){
                setScore((prevTurn)=>{
                    if(turn==1){
                        return [prevTurn[0]+1,prevTurn[1]]
                    }
                    return [prevTurn[0],prevTurn[0]+1]
                })
                setIsWon(true)
            }else{
                setTurn((prevTurn:number)=>{
                    return prevTurn===2?1:2
                })
            }
    },[game])
    
    const resetState=(reset : number)=>{
        if(reset ===1){
            window.location.reload();
        }
        setIsWon(false);
        setGame([...Array(9)]);
        setTurn(2);
        setOrder([[],[]])
        
    }
    
    return(<>
    {!isWon ?
        <div className="bg-background flex flex-col justify-center items-center min-h-screen gap-6">
        <div className="grid grid-cols-3 gap-0">
            {
                game.map((_,i)=><TicCard key={i} text={_} turn={turn} categorySelected={categorySelected} index={i} setGame={setGame}  isWon={isWon} setOrder={setOrder} order={order}/>)
            }
        </div>
        
        <div
        className="flex items-center justify-between bg-[#87CEEB]/90 p-6 rounded-2xl shadow-2xl min-w-[280px] max-w-md w-full backdrop-blur-md shadow-[0_0_25px_rgba(135,206,235,0.5)] hover:shadow-[0_0_30px_rgba(135,206,235,0.8)] transition-all duration-300"
      >
        <div className="flex flex-col items-center gap-1 w-1/3">
            <span className={cn("text-4xl drop-shadow-lg",turn==1&&"scale-110 transition-transform")}>
                {categorys.find((category)=>category.name===categorySelected[0])?.emoji[0]}
            </span>
            <span
            className={cn(
                "text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text",
                score[0] && "animate-pulse"
            )}
            >
                {score[0]}
            </span>
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <span className="text-white text-xl font-bold tracking-wider">VS</span>
        </div>
        <div className="flex flex-col items-center gap-1 w-1/3">
            <span className={cn("text-4xl drop-shadow-lg",turn==2&& "scale-110 transition-transform")}>
                {categorys.find((category)=>category.name===categorySelected[1])?.emoji[0]}
            </span>
            <span
            className={cn(
                "text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text",
                score[1] && "animate-pulse"
            )}
            >
                {score[1]}
            </span>
        </div>
      </div>
        </div>
:<WinningCard turn={turn} categorySelected={categorySelected} resetState={resetState}/>}</>
    )
}
