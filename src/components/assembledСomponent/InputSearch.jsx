import {observer} from "mobx-react-lite";
import {Input} from "@/components/ui/input.jsx";
import { Search } from "lucide-react"

const InputSearch = observer(({onChange, value}) => {
    return (
        <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-500 w-5 h-5"/>
            <Input
                className="pl-10 py-2 h-[50px] shadow-none"
                style={{ outline: "none", boxShadow: "none" }}
                placeholder="Search..."
                onChange={onChange}
                value={value}
            />
        </div>
    )
})

export default InputSearch;