import {observer} from "mobx-react-lite";

const Message = observer(({name, message}) => {
    return (
        <div
            className={"mb-2 p-1 ml-2 max-w-[400px] min-w-[200px] flex flex-wrap flex-col justify-between max-h-[200px] min-h-[50px] border border-gray-200 rounded-md bg-blue-200 opacity-1" }>
            <div>
                <span className={"text-gray-400"}>{name}</span>

            </div>
            <div className="break-all">{message}</div>
        </div>
    );
})

export default Message;