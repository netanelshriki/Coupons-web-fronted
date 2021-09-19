import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import notify from "../../../Services/Notifilcation";
import { logoutAction } from "../../Redux/AuthState";
import store from "../../Redux/Store";
import "./Logout.css";

function Logout(): JSX.Element {
    const history = useHistory();

    useEffect(()=> //React Hook for running side effects inside a fc
    { 
        notify.success("logout successfully!");
        store.dispatch(logoutAction());
        history.push("/home");
    });

    
    return (
        <></>
    );
}

export default Logout;
