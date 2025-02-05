import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {observer} from "mobx-react-lite";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import AddButton from "@/components/assembledСomponent/AddButton.jsx";

const UserCard = observer(({avatar, name, onClick, participants, onChange, onclickSubscribe, icon, disableAdd = false, disableSubscribe=false}) => {
   const [checked, setChacked] = React.useState(false);

   const handleChange = () => {
       setChacked(!checked);
   }

    return (
        <div  className="mb-0.5 flex items-center justify-between">
            <div onClick={onClick} className="mb-0.5 flex items-center">
                <Avatar className="w-10 h-10 ">
                    <AvatarImage
                        src={/*avatar*/ "#"}
                        alt="/public/images/mask.png"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <AvatarFallback className={"bg-blue-400"} >U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col align-top ml-2">
                    <span>{name}</span>
                    {participants
                        ?
                        <span className={"text-xs"}>
                            {participants}
                        </span>
                        : null}
                </div>
            </div>
            {onclickSubscribe  && disableSubscribe === false &&
            <AddButton icon={icon} onClick={onclickSubscribe}/>
            }
            {onChange && disableAdd === false ? <Checkbox
                className="peer h-4 w-4 rounded-sm border-gray-300 bg-transparent checked:bg-blue-500"
                onClick={() => {
                handleChange();
                onChange()
            }} /> : null}
        </div>
    );
});

export default UserCard;