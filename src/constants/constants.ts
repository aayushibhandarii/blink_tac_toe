export const categorys:{
    name:string,
    emoji : string[]
}[] = [

    {
        name : "Animal",
        emoji : ["🐶","🐱","🐭","🐰"]
    },
    {
        name : "Food",
        emoji : ["🍕","🍟","🍔","🍙"]
    },
    {
        name : "Sports",
        emoji : ["⚽","🏀","🏈","⚾"]
    }
]
export const handleWon=(emoji:string[]|undefined,game:string[])=>{
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