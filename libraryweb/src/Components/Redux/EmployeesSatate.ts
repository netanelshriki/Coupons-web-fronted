import UserModel from "../../UserModel/UserModel";


// Step 1 - Create AppState and manage the collection once and in a centralize place
export class EmployeesAppState {
    public employees: UserModel[] = [];
}

// Step 2 - Define ActionType using enum for all required operations
// export enum CatsActionType {
//     CatsDownloaded,
//     CatAdded,
//     CatUpdated,
//     CatDeleted
// }
export enum EmployeesActionType {
    EmployeesDownloaded = "EmployeesDownloaded",
    EmployeesAdded = "EmployeesAdded",
    EmployeesUpdated = "EmployeesUpdated",
    EmployeesDeleted = "EmployeesDeleted"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface EmployeeAction {
    type: EmployeesActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function EmployeesDownloadedAction(employees: UserModel[]): EmployeeAction {
    return { type: EmployeesActionType.EmployeesDownloaded, payload: employees };
}

export function EmployeesAddedAction(employee: UserModel): EmployeeAction {
    return { type: EmployeesActionType.EmployeesAdded, payload: employee };
}

export function EmployeesUpdatedAction(employee: UserModel): EmployeeAction {
    return { type: EmployeesActionType.EmployeesUpdated, payload: employee };
}

export function EmployeesDeletedAction(id:number): EmployeeAction {
    return { type: EmployeesActionType.EmployeesDeleted, payload: id };
}

// Step 5 - Reducer function perform the required action
export function employeesReducer(currentState: EmployeesAppState = new EmployeesAppState(),action:EmployeeAction): EmployeesAppState{
    // const newState = new EmployeesAppState();
    // newState.employees = currentState.employees;

    const newState = {...currentState} //Spread Operator
    switch(action.type){
        case EmployeesActionType.EmployeesDownloaded:
            newState.employees = action.payload;
            break;
        case EmployeesActionType.EmployeesAdded:
            newState.employees.push(action.payload);
            break;
        case EmployeesActionType.EmployeesUpdated:
              const idx = newState.employees.findIndex(c => c.id === action.payload.id);
              newState.employees[idx]=action.payload;    
            break
            case EmployeesActionType.EmployeesDeleted:
                  newState.employees = newState.employees.filter(e => e.id === action.payload.id);
                 // newState.cats.fil
                break
    }
    return newState;
    
}
