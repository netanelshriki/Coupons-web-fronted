import Coupon from "../../UserModel/Coupon";


// Step 1 - Create AppState and manage the collection once and in a centralize place
export class  CouponAppState {
    public coupons: Coupon[] = [];
}


export enum CouponActionType {
    couponDownloaded = " couponDownloaded",
    couponAdded = " CouponAdded",
    couponUpdated = " CouponUpdated",
    couponDeleted = " CouponDeleted"


}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CouponAction {
    type: CouponActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function CouponDownloadedAction(coupon: Coupon[]):  CouponAction{
    return { type: CouponActionType.couponDownloaded, payload: coupon };
}

export function CouponAddedAction(coupon: Coupon): CouponAction {
    return { type: CouponActionType.couponAdded, payload: coupon };
}

export function CouponkUpdatedAction(coupon: Coupon): CouponAction {
    return { type: CouponActionType.couponUpdated, payload: coupon };
}

export function  CouponkDeletedAction(id:number):  CouponAction {
    return { type:CouponActionType.couponDeleted, payload: id };
}

// Step 5 - Reducer function perform the required action
export function  CouponReducer(currentState:  CouponAppState = new  CouponAppState(),action:CouponAction): CouponAppState{
   

    const newState = {...currentState} 
    switch(action.type){
        case CouponActionType.couponDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponActionType.couponAdded:
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.couponUpdated:
              const idx = newState.coupons.findIndex(c => c.id === action.payload.id);
              newState.coupons[idx]=action.payload;    
            break
            case CouponActionType.couponDeleted:
                  newState.coupons = newState.coupons.filter(c => c.id === action.payload.id);
         
                break
    }
    return newState;
    
}