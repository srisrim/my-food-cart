import { createContext } from "react";

const UserContext = createContext({
    isLoggedIn: 'Default User'
});

export default UserContext;