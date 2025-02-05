import React from 'react';
import {observer} from "mobx-react-lite";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import { Send } from "lucide-react";

const SendInput = observer(( {value, onChange, onClick}) => {
    return (
        <div className="flex items-center border rounded-xl p-2 gap-2 w-full h-full max-w-[800px] relative">
            <Input
                value={value}
                onChange={onChange}
                placeholder="Введите сообщение..."
                className="flex-1 h-full"
                style={{ outline: "none", boxShadow: "none" }}
            />
            <Button onClick={onClick} className={"absolute right-3"} variant="outline">
                <Send className="w-5 h-5"/>
            </Button>
        </div>
    );
})

export default SendInput;