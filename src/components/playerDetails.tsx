import { useState, type SetStateAction } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { categorys } from "@/constants/constants";
import { cn } from "@/lib/utils";


export default function PlayerDetails(
    {player,setCategorySelected} : {
        player:string,
        setCategorySelected : React.Dispatch<SetStateAction<string[]>>
    }
){
    
    const [open,setOpen] = useState(false);
    const [value, setValue] = useState("")
    return(
        <div className="bg-black flex justify-center items-center min-h-screen px-4">
                <Card className="relative w-full max-w-sm p-8 rounded-3xl border border-white/20 backdrop-blur-md bg-gradient-to-br from-pink-400 via-purple-400 to-violet-600 shadow-2xl text-white transition-all duration-300 hover:scale-105">
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-extrabold">
                            Player {player}
                        </CardTitle>
                        <CardDescription className="text-white/90 font-medium text-lg mt-2">
                            Select your Emoji Category
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-60 justify-between bg-white/10 text-white border-white/30 hover:bg-white/20 transition-colors"
                                >
                                {value
                                    ? (categorys.find((category) => category.name === value)?.name+" "+categorys.find((category) => category.name === value)?.emoji)
                                    : "select the category" 
                                }
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-70" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-60 p-0 bg-white text-black rounded-lg shadow-lg z-50">
                                <Command>
                                <CommandInput placeholder="Search category..." className="focus:ring-0"/>
                                <CommandList>
                                    <CommandGroup>
                                    {categorys.map((category) => (
                                        <CommandItem
                                        key={category.name}
                                        value={category.name}
                                        className="cursor-pointer hover:bg-purple-100 transition-colors"
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                        >
                                        <Check
                                            className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {category.name}
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                </CommandList>
                                </Command>
                            </PopoverContent>
                            </Popover>
                    </CardContent>
                    <CardFooter className="mt-4 flex justify-center">
                        <Button onClick={value ? ()=>{
                            setCategorySelected((prevCategorySelected : string[])=>{
                                const categorySet = new Set(prevCategorySelected)
                                categorySet.add(value);
                                return Array.from(categorySet);
                            })
                            setValue("");
                        } : undefined}
                        className={cn(
              "bg-white text-purple-700 font-bold px-6 py-2 rounded-full",
              "hover:bg-purple-100 transition-all duration-300 hover:scale-105",
              !value && "opacity-50 cursor-not-allowed"
            )}
            disabled={!value}
                        >
                            OK
                        </Button>
                    </CardFooter>
                </Card>
        </div>
        
    )
}