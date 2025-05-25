import { useEffect, useState } from "react";
import TicCard from "./ticCard";
import { categorys } from "@/constants/category";
import { Button } from "./ui/button";

export default function Tictactoe({categorySelected}:{categorySelected  :string[]}){
    const [game,setGame] = useState<string[]>([...Array(9)]);
    const [turn ,setTurn] = useState(1);
    const [order,setOrder] = useState<Array<Array<{emoji: string ,index: number }>>>([[],[]]);
    const [isWon,setIsWon] = useState(false);
    const [score,setScore] = useState([0,0]);
    console.log(order)
    useEffect(()=>{
            const emoji : string[] | undefined = categorys.find((category)=>category.name==categorySelected[turn-1])?.emoji;
            if(handleWon(emoji)){
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
    const handleWon=(emoji:string[]|undefined)=>{
        //horizontal
        let count:number =0;
        for(let i=0;i<9;i++){
            if(i%3==0){
                if(count==3){
                    return true;
                }
                count =0;
            }
            if(game[i] && emoji?.includes(game[i])){
                    count++;
            }
        }
        //vertical
        count=0;
        for(let i=0;i<3;i++){
            
            
            count=0;
            for(let j=i;j<9;j+=3){
                console.log(game[j])
                if(game[j] && emoji?.includes(game[j])){
                    count++;
                }
            }
            if(count==3){
                return true;
            }
        }
        //diagonal 1
        count =0;
        [0,4,8].forEach((i)=>{
            if(game[i] && emoji?.includes(game[i])){
                    count++;
            }
        })
        if(count==3){
            return true;
        }
        //diagonal 3
        count =0;
        [2,4,6].forEach((i)=>{
            if(game[i] && emoji?.includes(game[i])){
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
            <h1>Player1 Score {score[0]}</h1>
            <h1>Player2 Score {score[1]}</h1>
        {
            isWon?<h1>Player {turn}</h1>:null
        }
        <div className="grid grid-cols-3 gap-0">
            {
                game.map((_,i)=><TicCard key={i} text={_} turn={turn} categorySelected={categorySelected} index={i} setGame={setGame}  isWon={isWon} setOrder={setOrder} order={order}/>)
            }
        </div>
        {
            isWon? (
                <div>
                    <Button onClick={()=>resetState(0)}>Play Again</Button>
                    <Button onClick={()=>resetState(1)}>Restart</Button>
                </div>
            
        ): null
        }
        </>
    )
}
