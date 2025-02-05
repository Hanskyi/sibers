import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";

class NewStore {
    authError = '';
    users = [];
    allUsers = [];
    username = '';

    constructor() {
        makeAutoObservable(this);
    }

    async getData  ()  {
        try {
            const response = await axios.get('https://hr2.sibers.com/test/frontend/users.json');
            this.users = response.data;
            this.allUsers = response.data;
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };
    setUserName(username) {
        this.username = username;
    }

     checkAuth() {
        if (!this.allUsers || this.allUsers.length === 0) {
            this.authError = 'Данные пользователей не загружены.';
            return;
        }
        const findUser = this.allUsers.find(user => user.name === this.username);

        if (findUser) {
            localStorage.setItem('SibersUser', JSON.stringify(findUser));
            return true;
        } else {
            this.authError = `User ${this.username} does not exist!`;
        }
        this.username = "";
    }

    filterUsersBySearch (e) {
        runInAction(()=>{
            if(!e.target.value.trim()) {
                this.users = this.allUsers;
            } else {
                this.users = this.allUsers.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
            }
        })
    }
}

const MainStore = new NewStore();
export default MainStore;