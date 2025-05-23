import { useState, type SetStateAction } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { categorys } from "@/constants/category";
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
        <Card>
            <CardHeader>
                <CardTitle>
                    Player {player}
                </CardTitle>
                <CardDescription>
                    Select your Emoji Category
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                        >
                        {value
                            ? (categorys.find((category) => category.name === value)?.name+" "+categorys.find((category) => category.name === value)?.emoji)
                            : "select the category" 
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                            <CommandGroup>
                            {categorys.map((category) => (
                                <CommandItem
                                key={category.name}
                                value={category.name}
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
            <CardFooter>
                <Button onClick={value ? ()=>{
                    setCategorySelected((prevCategorySelected : string[])=>{
                        const categorySet = new Set(prevCategorySelected)
                        categorySet.add(value);
                        return Array.from(categorySet);
                    })
                    setValue("");
                } : undefined}>
                    OK
                </Button>
            </CardFooter>
        </Card>
    )
}