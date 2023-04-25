import { useContext } from "react";
import AuthContext from '../context/authProvide';

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;