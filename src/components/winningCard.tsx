import { categorys } from "@/constants/constants";
import { useEffect} from "react";
import Confetti from 'react-confetti'
const sound = new Audio("../../yay-6326.mp3");
export default function WinningCard(
    {turn,categorySelected,resetState}:
    {
        turn : number,
        categorySelected : string[],
        resetState : (x:number)=>void
    }){
        const emoji = categorys.find((category)=>category.name === categorySelected[turn-1])?.emoji;
        useEffect(()=>{
            sound.play().catch((error)=>{
                console.log("YAYYYYYYY");
                console.log(error);
            })
    },[])
    
    return(
        <>
            <div className="bg-background flex flex-col justify-center items-center gap-6">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"]}
        />
        </div>
            <div className="min-h-screen bg-gradient-to-br from-[#c197fc] to-[#7e57c2] flex items-center justify-center px-4">
        <div className="relative bg-[#2e1b4d] p-12 rounded-3xl shadow-2xl max-w-md w-full text-center">
            {/* Glowing Star Icon */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-20 bg-yellow-400 rounded-full shadow-[0_0_30px_10px_rgba(251,191,36,0.6)] flex items-center justify-center ">
                <div className="w-12 h-12 bg-yellow-300 rounded-full shadow-inner flex items-center justify-center text-2xl" >
                    {
                    emoji&& emoji[0]
                    }
                </div>
            </div>
            </div>
            <div className="bg-[#e2e8f0] rounded-xl py-10 px-6 mt-8 shadow-inner relative">
            <div className="absolute w-3 h-3 rounded-full  top-3 left-3 flex items-center justify-center" >{emoji && emoji[2]}</div>
            <div className="absolute w-3 h-3 rounded-full top-3 right-3 flex items-center justify-center" >{emoji && emoji[3]}</div>
            <div className="absolute w-3 h-3 rounded-full  bottom-3 left-3 flex items-center justify-center">{emoji && emoji[3]}</div>
            <div className="absolute w-3 h-3 rounded-full bottom-3 right-3 flex items-center justify-center">{emoji && emoji[2]}</div>

            <h1 className="text-2xl font-bold text-[#2e1b4d] mb-6 tracking-wide">
                {emoji&&emoji[1]} Player{turn} WINS {emoji&&emoji[1]}
            </h1>

            {/* Buttons */}
            <div className="flex justify-center gap-6">
                <button className="px-5 py-2 bg-black text-white text-sm rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-900 shadow-md" onClick={()=>resetState(0)}>
                NEXT ROUND
                </button>
                <button className="px-5 py-2 bg-black text-white text-sm rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-900 shadow-md" onClick={()=>resetState(1)}>
                RESTART
                </button>
            </div>
            </div>
        </div>
        </div>
    </>
    )
}
