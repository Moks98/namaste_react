import { createContext } from "react";

const UserContext = createContext({ loggedInUser: "No user" });

export default UserContext;
