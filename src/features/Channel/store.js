import {makeAutoObservable, runInAction, toJS} from "mobx";
import { collection,setDoc, addDoc, onSnapshot, doc, updateDoc, arrayUnion  } from "firebase/firestore";
import {firestore} from "@/main.jsx";


class NewStore {
    //channels store
    selectedChannel = {}
    selectedMembers =[]
    channels = [];
    allChannels= [];
    selectedList = 'my list';

    //open and close create channel panel
    sideBarCreate = false;
    inputSearch = "";

    //send message store
    messageInput = "";
    messages=[];

    //alert
    open = false;

    //user store
    user ={}

// new channel store
    newChannel= {
        avatar: "",
        name: "",
        messages: [],
        participants: [],
        created_by: null,
        created_at: null,
    }

    clearNewChannel() {
        runInAction(()=>{
            this.newChannel = {
                avatar: "",
                name: "",
                messages: [],
                participants: [],
                created_by: null,
                created_at: null,
            };
        })
    }

    constructor() {
        makeAutoObservable(this);
    }

    changOpenAlert () {
        runInAction(()=>{
            this.open = !this.open;
        })
    }

// set values for input fields
    changeInputChannelName(e){
        runInAction(()=>{
            this.newChannel.name = e
        })
    }

    onChangeMessageInput(e){
        this.messageInput = e.target.value;
    }

    handleChangeChannel(channel) {
        runInAction(()=>{
            this.selectedChannel = channel;
            this.messages =  channel.messages.reverse();
            this.selectedMembers = channel.participants;
        })
    }


// When changing tabs, this code generates the channels list and adds the 'isSubscriber' field.

    filterChannels () {
        runInAction(()=>{
            const userInfo = JSON.parse(localStorage.getItem("SibersUser"));
            if(this.selectedList === 'my list') {
                this.channels = this.allChannels.filter(channel => {
                    const find = channel.participants.find(p => p.user_id === this.user.id)
                    if(find) return channel;
                });
            } else {
                this.channels = this.allChannels.map(c => {
                    const find =  c.participants.find(p => p.user_id === userInfo.id);
                    if (find) {
                        return find ? (find.created_by === userInfo.id ?
                            { ...c, isSubscriber: true,  }
                            : { ...c, isSubscriber: true }) : c;
                    }
                    return c;
                });
            }
            this.inputSearch = ""
        })
    }

    SearchChannel (e) {
        runInAction(()=>{
            this.inputSearch = e.target.value
            if(!e.target.value.trim()) {
                this.filterChannels();
            } else {
                this.channels = this.channels.filter(c => c.name.toLowerCase().includes(e.target.value.toLowerCase()));
            }
        })
    }

 // change tabs in left sidebar
    changeListChannel(listName) {
        runInAction(()=>{
            this.selectedList = listName
            this.filterChannels()
        })
    }
// open sidebar create panel with all users
    openSideBarCreate() {
        this.sideBarCreate = !this.sideBarCreate;
        if(this.sideBarCreate === false) {
            this.clearNewChannel()
        }
    }
// add members
    handleChangeAddUsers(id, name, avatar){
        runInAction(()=>{
            const find = this.newChannel.participants.find((p) => p.id === id);
            if (find) {
                this.newChannel.participants = this.newChannel.participants.filter((p) => p.id !== id);
            } else {
                this.newChannel.participants = [
                    ...this.newChannel.participants,
                    { id: Math.floor(10000 + Math.random() * 90000), name, avatar, user_id: id }
                ];
            }
        })
    }

    setSelectedChannel(channel) {
        runInAction(() => {
            if (channel && channel.messages) {
                this.messages = channel.messages.reverse();;
                this.selectedMembers = channel.participants || [];
            } else {
                this.messages = [];
                this.selectedMembers = [];
            }
        });
    }

    // realtime firebase get all channels
    async getAllChannels(){
        try {
            const unsubscribe = onSnapshot(collection(firestore, "channels"), (querySnapshot) => {
                const channels = querySnapshot.docs.map(doc => doc.data());

                runInAction(() => {
                    this.allChannels = channels;
                    this.filterChannels()
                    if(this.selectedChannel) {
                        const ch = channels.find(channel => channel.id === this.selectedChannel.id);
                        this.setSelectedChannel(ch)
                    }
                });

                console.log("Получены новые данные:");
            });

            return unsubscribe;
        } catch (error) {
            console.error("Ошибка при подписке на каналы:", error);
        }
    }

    async createNewChannel(){
        try {
            const user =  JSON.parse(localStorage.getItem("SibersUser"));
            const channelId = Math.floor(10000 + Math.random() * 90000).toString();
            const data = {
                id: channelId,
                avatar: user.avatar,
                name: this.newChannel.name,
                messages: [],
                participants: [...this.newChannel.participants,
                    {
                        name: user.name,
                        avatar:  user.avatar,
                        user_id: user.id,
                        isAdmin: true
                    }],
                created_by: user.id,
                created_at: new Date().toISOString(),
            }

            const channelRef = doc(firestore, "channels", channelId);
            await setDoc(channelRef, data);
            console.log("Канал создан с ID:", channelRef.id);
            this.openSideBarCreate();
        } catch (error) {
            console.error("Error creating channel:", error);
        }
    }

    getUserLocalStorage(){
        this.user = JSON.parse(localStorage.getItem("SibersUser"));
    }


    async sendMessageToChannel() {
        if (!this.selectedChannel.id || !this.messageInput) {
            return;
        }
        const user = JSON.parse(localStorage.getItem("SibersUser"));

        try {
            let channelId = this.selectedChannel.id;
            const channelRef = doc(firestore, "channels", channelId);

            const newMessage = {
                id: Date.now().toString(),
                name: user.name,
                message: this.messageInput,
                date: new Date().toISOString(),
                created_by: user.id,
            };
            runInAction(() => {
                this.messageInput = "";
            })

            await setDoc(channelRef, {
                messages: arrayUnion(newMessage)
            }, { merge: true });

        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    async sendSubscribeChannel(chanelId) {
        try {
            const channelRef = doc(firestore, "channels", chanelId);
            const subscribe = {
                id: Math.floor(10000 + Math.random() * 90000),
                name: this.user.name,
                avatar: this.user.avatar,
                user_id: this.user.id,
            };

            await setDoc(channelRef, {
                participants: arrayUnion(subscribe)
            }, { merge: true });
        } catch (error) {
            console.error("Error sending subscribe:", error);
        }
    }

    async sendLeaveToSubscribeChannel(userId) {
        try {
            const chanelId = this.selectedChannel.id;
            const channelRef = doc(firestore, "channels", chanelId);
            const subscribeUsers = toJS(this.selectedChannel.participants);
            const newListSubscribe = subscribeUsers.filter(s => s.user_id !== userId);
            await updateDoc(channelRef, {
                participants: newListSubscribe
            });

            this.selectedChannel.participants = newListSubscribe;
            this.selectedMembers = newListSubscribe

        } catch (error) {
            console.error("Error removing user:", error);
        }
    }
}

export default new NewStore();