import { Role } from "./role";

export class Profile {
    id: string = "";
    uid: string;
    user_email: string;
    role: Role
    name: string;
    last_name: string;
    age: number;
    id_number: string;

    constructor (uid: string = "", name: string = "", last_name: string = "", age: number = 0,  id_number: string = "", user_email: string = "", role: Role) {
        this.uid = uid;
        this.name = name;
        this.last_name = last_name;
        this.age = age;
        this.id_number = id_number;
        this.user_email = user_email;
        this.role = role;
    }

    public getLiteralObjectRepresentation(): any {
        return {
            "uid": this.uid,
            "name": this.name,
            "last_name": this.last_name,
            "age": this.age,
            "id_number": this.id_number,
            "user_email": this.user_email,
            "role": this.role
        }
    }



}
