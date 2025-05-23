import { categorys } from "@/constants/category";
import { Button } from "./ui/button";

export default function TicCard({
    text,
    turn,
    categorySelected,
    index ,
    setTurn,
    setGame
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
        if(! emoji?.includes(text)){
            setTurn((prevTurn:number)=>{
                return prevTurn===2?1:2
            })
            setGame((prevGame : string[])=>{
                const game = prevGame;
                game[index] = emoji?emoji[random]:"";
                return [...game];
            })
        }
        console.log(emoji)
    }
    return(
        <Button onClick={handleClick}>
            <div className="w-20 h-20 border-2 border-amber-400">
                {text}
            </div>
        </Button>
        
    )
}