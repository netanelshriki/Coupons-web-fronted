import ClientType from "./clientTypeModel";

class ClientModel{
    public email?:string;
    public password?:string;
    public clientType?: ClientType;
    public clientId?:number;
    public name?:string;
    public token?: string;


}
export default ClientModel;