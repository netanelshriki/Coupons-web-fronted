import CouponGet from "../../UserModel/CouponGet";



// Step 1 - Create AppState and manage the collection once and in a centralize place
export class  CouponGetAppState {
    public coupons: CouponGet[] = [];
}


export enum CouponActionType {
    couponGeDownloaded = " couponGeDownloaded",
    couponGetAdded = " couponGetAdded",
    couponGetUpdated = " couponGetUpdated",
    couponGetDeleted = " couponGetDeleted"


}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CouponGetAction {
    type: CouponActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function CouponGetDownloadedAction(coupon: CouponGet[]):  CouponGetAction{
    return { type: CouponActionType.couponGeDownloaded, payload: coupon };
}

export function CouponGetAddedAction(coupon: CouponGet): CouponGetAction {
    return { type: CouponActionType.couponGetAdded, payload: coupon };
}

export function CouponGetkUpdatedAction(coupon: CouponGet): CouponGetAction {
    return { type: CouponActionType.couponGetUpdated, payload: coupon };
}

export function  CouponkGetDeletedAction(id:number):  CouponGetAction {
    return { type:CouponActionType.couponGetDeleted, payload: id };
}

// Step 5 - Reducer function perform the required action
export function CouponGetReducer(currentState:  CouponGetAppState = new  CouponGetAppState(),action:CouponGetAction): CouponGetAppState{
   

    const newState = {...currentState} 
    switch(action.type){
        case CouponActionType.couponGeDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponActionType.couponGetAdded:
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.couponGetUpdated:
              const idx = newState.coupons.findIndex(c => c.id === action.payload.id);
              newState.coupons[idx]=action.payload;    
            break
            case CouponActionType.couponGetDeleted:
                  newState.coupons = newState.coupons.filter(c => c.id === action.payload.id);
         
                break
    }
    return newState;
    
}