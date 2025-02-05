import {Routes, Route, Navigate} from 'react-router-dom';
import {privateRoute, publicRoute} from "@/rotes.jsx";
import {useEffect, useState} from "react";

const AppRouter = () => {
    const user  = localStorage.getItem('SibersUser') !== null;

    console.log(user);
    return (
            <Routes>
                {(user ?
                    privateRoute :
                    publicRoute).map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
                <Route path="*" element={<Navigate to={user ? `/channels` : "/login"} />} />
            </Routes>
        )
};

export default AppRouter;