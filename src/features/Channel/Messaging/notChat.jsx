import {observer} from "mobx-react-lite";

const NotChat = observer(() => {
    return (
        <div className="flex w-[100%] h-[100vh] justify-center items-center">
            <img
                src={'/public/images/chat.png'}
                alt={"Not chat"}
                className="w-[270px] h-[200px]"
            ></img>
        </div>
    )
})
export default NotChat;