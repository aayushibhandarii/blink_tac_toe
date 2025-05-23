import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { categorys } from "@/constants/category";
import { cn } from "@/lib/utils";

export default function PlayerDetails(
    {player,setCategorySelected}
){
    
    const [open,setOpen] = useState(false);
    const [value, setValue] = useState("")
    console.log(value);
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
                <Button onClick={()=>{
                    const index:number =categorys.findIndex((category)=>category.name === value);
                    setCategorySelected((prevCategorySelected : string[])=>{
                        return [...prevCategorySelected, value];
                    })
                    categorys.splice(index,1);
                    setValue("");
                }}>
                    OK
                </Button>
            </CardFooter>
        </Card>
    )
}