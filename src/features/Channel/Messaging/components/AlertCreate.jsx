import React from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.jsx";
import {observer} from "mobx-react-lite";
import UserCard from "@/components/assembledСomponent/UserCard.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import store from "@/features/Channel/store.js";

const AlertCreate = observer(({open, onClose }) => {
    return (
        <AlertDialog open={open} className="flex items-center justify-center">
            <AlertDialogContent className="h-[90vh] w-[800px] max-h-[90vh] overflow-y-auto">
                <AlertDialogHeader className={"flex flex-col"}>
                    <Avatar className="w-[50px] h-[50px] ml-auto mr-auto">
                        <AvatarImage
                            src={/*store.selectedChannel.avatar*/ ""}
                            alt="/public/images/mask.png"
                            className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        <AvatarFallback className={"bg-blue-400"}>U</AvatarFallback>
                    </Avatar>
                    <div className={"flex justify-between items-center"}>
                        <AlertDialogTitle>Канал: {store.selectedChannel.name} </AlertDialogTitle>
                        <span>Участников: {store.selectedMembers?.length}</span>
                    </div>
                    <AlertDialogDescription className={" mt-3 scroll-auto"}>
                            {store.selectedMembers?.map((item) => (
                                <UserCard
                                    key={item.id}
                                    avatar={item.avatar}
                                    name={item.name}
                                    onclickSubscribe={
                                           async ()=>
                                            {
                                                if (store.selectedChannel.created_by === store.user.id)
                                                  await  store.sendLeaveToSubscribeChannel(item.user_id)
                                            }
                                    }
                                    disableAdd={true}
                                    disableSubscribe={store.selectedChannel.created_by !== store.user.id && true}
                                    disableS={true}
                                    icon={ "-" }
                                />
                            ))}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-auto" onClose={onClose}>
                        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
});

export default AlertCreate;