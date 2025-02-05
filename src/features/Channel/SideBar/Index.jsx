import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar.jsx"
import {observer} from "mobx-react-lite";
import InputSearch from "@/components/assembledСomponent/InputSearch.jsx";

import UserCard from "@/components/assembledСomponent/UserCard.jsx";
import store from "../store.js"
import AddButton from "@/components/assembledСomponent/AddButton.jsx";
import CreateChannel from "@/features/Channel/SideBar/CreateChannel.jsx";

// Main sidebar
const SideBar = observer(() => {
    return (
        <>
            {store.sideBarCreate
                ?
                <CreateChannel/>
                :
                <SidebarProvider className="max-w-[300px]">
                    <Sidebar className="max-w-[300px] w-[100%]">
                        <SidebarContent>
                            <SidebarGroup>
                                <InputSearch
                                    onChange={(e) => store.SearchChannel(e)}
                                    value={store.inputSearch}
                                />
                                <SidebarGroupLabel className="mb-3 mt-2 flex-1 cursor-pointer gap-2.5">
                                    <span
                                        className={`underlineText ${store.selectedList === "my list" && "underlineTextSelected"}`}
                                        onClick={() => store.changeListChannel("my list")}
                                    >
                                        Мои каналы
                                    </span>
                                    <span
                                        className={`underlineText ${store.selectedList === "all channels" && "underlineTextSelected"}`}
                                        onClick={e => store.changeListChannel("all channels")}
                                    >
                                        Все каналы
                                    </span>
                                    <AddButton onClick={() => store.openSideBarCreate()}/>
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {store.channels?.map((item, i) => (
                                            <SidebarMenuItem
                                                key={`${i}-sidebar`}
                                                className="cursor-pointer"
                                            >
                                                <SidebarMenuButton asChild>
                                                    <UserCard
                                                        key={`${i}-channels`}
                                                        avatar={item.avatar}
                                                        name={item.name}
                                                        onClick={() => {
                                                            store.handleChangeChannel(item);
                                                        }}
                                                        icon={"+"}
                                                        onclickSubscribe={
                                                            !item.isSubscriber && store.selectedList === "all channels" ?
                                                                () => {
                                                                    store.sendSubscribeChannel(item.id);
                                                                    store.filterChannels()
                                                                }
                                                                : null
                                                        }
                                                        participants={item.isAdmin ? 'Вы админ' : (item.isSubscriber ? 'Вы подписаны' : null)}
                                                    />
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </SidebarProvider>
            }
        </>
    )
})

export default SideBar;