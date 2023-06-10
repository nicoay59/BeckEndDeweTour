import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  role: "",
  user: {},
  transaction:null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // add case "USER_SUCCESS" here ..
      case "USER_SUCCESS":
      case 'LOGIN_SUCCESS':
      // Set localstorage item with key "token" here ...
          localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        role: payload.role,
        user: payload,
      };
      case "DETAIL_USER":
        return{
          transaction: payload,
        }
    // add case "AUTH_ERROR" here ..
    case 'LOGOUT':
    case "AUTH_ERROR":
      // Remove localstorage item with key "token" here ...
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};