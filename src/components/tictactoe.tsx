import { useState } from "react";
import TicCard from "./ticCard";

export default function Tictactoe({categorySelected}:{categorySelected  :string[]}){
    const [game,setGame] = useState([...Array(9)]);
    const [turn ,setTurn] = useState(1);
    
    return(
        <>
        <div className="grid grid-cols-3 gap-0">
            {
                game.map((_,i)=><TicCard key={i} index={i} text={_} turn={turn} setGame={setGame} setTurn={setTurn} categorySelected={categorySelected}/>)
            }
        </div>
            
        </>
    )
}