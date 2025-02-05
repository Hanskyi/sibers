import {
    Sidebar,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider
} from "@/components/ui/sidebar.jsx";
import {observer} from "mobx-react-lite";
import InputSearch from "@/components/assembledСomponent/InputSearch.jsx";
import store from "@/features/Channel/store.js";
import AddButton from "@/components/assembledСomponent/AddButton.jsx";
import UserCard from "@/components/assembledСomponent/UserCard.jsx";
import MainStore from "@/features/MainStore.js";
import {useEffect} from "react";
import CustomInput from "@/components/assembledСomponent/CustomInput.jsx";

// sidebar for creating channels with a list of users
const CreateChannel = observer(() => {
    useEffect(() => {
        MainStore.getData()
    }, [])

    return (
        <SidebarProvider className="max-w-[300px]">
            <Sidebar className="max-w-[300px] w-[100%]">
                <SidebarGroup>
                    <InputSearch onChange={(e) => MainStore.filterUsersBySearch(e)} />
                    <SidebarGroupLabel className="mb-3 mt-2 flex justify-between cursor-pointer gap-2.5">
                            <span
                                className={`underlineText ${store.selectedList === 2 && "underlineTextSelected"}`}
                            >
                                Выберите участников
                            </span>

                        <div className={"flex"}>
                            <AddButton onClick={()=> store.createNewChannel()} icon={"ок"}/>
                            <AddButton onClick={() => store.openSideBarCreate()} icon={"x"}/>
                        </div>
                    </SidebarGroupLabel>
                    <CustomInput
                        value={store.newChannel.name}
                        placeholder={"Название группы"}
                        onChange = {(e) => store.changeInputChannelName(e.target.value)}
                        id={"newChannelInput"}
                    ></CustomInput>
                    <SidebarGroupContent>
                        <SidebarMenu style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                            {MainStore.users?.map((item) => (
                                <SidebarMenuItem key={item.title} className="cursor-pointer">
                                    <SidebarMenuButton asChild>
                                        <UserCard
                                            avatar={item.avatar}
                                            name={item.name}
                                            onClick={(e) => e}
                                            onChange={() => store.handleChangeAddUsers(item.id,item.name, item.avatar)}
                                        />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </Sidebar>
        </SidebarProvider>
    );
});

export default CreateChannel;