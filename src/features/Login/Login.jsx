import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {useEffect} from "react";
import MainStore from "@/features/MainStore.js";
import {Button} from "@/components/ui/button.jsx";
import {observer} from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';


const Login = observer(() => {
    const navigate = useNavigate();

    useEffect(() => {
        (async ()=> {
            await MainStore.getData()
        })()
    }, [])

    const handleSubmit = async (e) => {
        const answer = MainStore.checkAuth()

        if (answer === true) {
            navigate("/channel");
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <form className={'flex flex-col items-center gap-2 '} onSubmit={handleSubmit}>
                <Label  htmlFor="auth-input">Авторизация</Label>
                <Input
                    className="mt-2"
                    id="auth-input"
                    placeholder="Введите имя из Json"
                    onChange={(e) => MainStore.setUserName(e.target.value)}
                >

                </Input>
                {MainStore.authError !== '' && <span className={' right-10'}>{MainStore.authError}</span>}
                <Button className="mt-2 " htmlType="submit">Войти</Button>
            </form>
        </div>
    );
});

export default Login;