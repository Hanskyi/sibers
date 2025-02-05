import React from 'react';
import {Button} from "@/components/ui/button.jsx";

const AddButton = ({onClick, icon}) => {
    return (
        <div>
            <Button
                onClick={onClick}
                variant="outline"
                className="bg-transparent w-8 h-8 rounded-full hover:bg-gray-200/50 text-gray-700 p-2 text-lg border-none">
                {icon ? icon : "+"}
            </Button>
        </div>
    );
};

export default AddButton;