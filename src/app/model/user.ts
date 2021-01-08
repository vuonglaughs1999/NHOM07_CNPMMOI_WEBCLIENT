export class User {
    _id: string;
    username:string;
    password:string;
    name:string;
    email:string;
    socialId: String;
    phoneNumber:string;
    firstName:string;
    lastName:string;
    constructor(){
        this._id="";
        this.username="";
        this.password="";
        this.name="";
        this.email="";
        this.phoneNumber="";
        this.firstName="";
        this.lastName="";
        this.socialId="";
    }
}
