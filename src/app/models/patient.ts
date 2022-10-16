import { User } from "./user";

export class Patient extends User {

    constructor (mail: string, role: number, name: string,  lastname: string, age: number, idNumber: string ) {

        super (mail, role, name, lastname, age, idNumber);

    }

}
