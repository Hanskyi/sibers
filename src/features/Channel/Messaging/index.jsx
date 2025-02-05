import {useEffect} from "react";
import store from "@/features/Channel/store.js";
import {observer} from "mobx-react-lite";
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar.jsx";
import UserCard from "@/components/assembledСomponent/UserCard.jsx";
import NotChat from "@/features/Channel/Messaging/notChat.jsx";
import Message from "@/components/assembledСomponent/Message.jsx";
import SendInput from "@/components/assembledСomponent/SendInput.jsx";
import AlertCreate from "@/features/Channel/Messaging/components/AlertCreate.jsx";

const Messaging = observer(() => {
    return (
        <>
            {store.selectedChannel && typeof store.selectedChannel === "object" && Object.keys(store.selectedChannel).length > 0  ?
                <div className="flex flex-col h-screen w-full">
                    <Menubar className="flex justify-between items-center max-h-[70px] h-full">
                        <MenubarMenu>
                            <UserCard
                                avatar={store.selectedChannel?.avatar}
                                name={store.selectedChannel?.name}
                                participants={store.selectedMembers?.length?.toString() || "0"}
                            />
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Настройки</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem
                                    onClick={()=> store.changOpenAlert()}
                                >О группе</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                    <div className={"flex-grow h-[calc(100vh-70px-150px)] overflow-y-auto flex flex-col-reverse"}>
                        {store.messages.map(i => {
                            return (
                                <div key={i.created_at}
                                     className={store.user.id === i.created_by ? " ml-auto" : null}>
                                    <Message
                                        key={i.created_at}
                                        name={i.name}
                                        message={i.message}
                                        date={i.created_at}
                                    />
                                </div>
                            )
                        })}

                    </div>
                    <div className={"ml-auto mr-auto max-w-[700px] w-full mb-[20px] max-h-[150px] min-h-[70px]"}>
                        <SendInput
                            value={store.messageInput}
                            onChange={(e)=> store.onChangeMessageInput(e)}
                            onClick = {()=> store.sendMessageToChannel()}
                        />
                    </div>
                    <AlertCreate
                        open={store.open}
                        onClose={()=> store.changOpenAlert()}
                    />
                </div>
                : <NotChat/>}
        </>
    )
});

export default Messaging;