import UserAuthModel from "../../UserModel/UserAuthModel";
import ClientModel from "../../UserModel/ClientModel";



export class AuthAppState{
    public client: ClientModel =null;

    public constructor(){
        const storedUser = JSON.parse(localStorage.getItem('client'));
        if(storedUser) {
            this.client = storedUser;
        }
    }
}



// Step 2 - Define ActionType using enum for all required operations
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface AuthAction {
    type: AuthActionType;
    payload?: any; // ? for logout
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function registerAction(client: UserAuthModel): AuthAction {
    return { type: AuthActionType.Register,payload:client };
}

export function loginAction(client: ClientModel): AuthAction {
    return { type: AuthActionType.Login ,payload:client};
}

export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout};
}

// Step 5 - Reducer function perform the required action
export function authReducer(currentState: AuthAppState = new AuthAppState(),
                            action:AuthAction): AuthAppState{
    // const newState = new CatsAppState();
    // newState.cats = currentState.cats;

    const newState = {...currentState} //Spread Operator
    switch(action.type){
        case AuthActionType.Register: //Payload is registered user from backend
            newState.client = action.payload;
            localStorage.setItem("client",JSON.stringify(newState.client)); // Saving in the session storage (won't be deleted)
            break;
        case AuthActionType.Login://Payload is logged i user from backend
            newState.client = action.payload;
            localStorage.setItem("client",JSON.stringify(newState.client)); // Saving in the session storage (won't be deleted)
            break;
        case AuthActionType.Logout: // No payload
        newState.client = null;
            localStorage.removeItem("client");
          
            break;
            
    }
    return newState;
    
}