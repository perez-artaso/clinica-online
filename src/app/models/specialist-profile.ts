import { Profile } from "./profile";
import { Role } from "./role";

export class SpecialistProfile extends Profile {

    approved: number;
    speciality: string;

    constructor ( uid: string = "", name: string = "", last_name: string = "", age: number = 0,  id_number: string = "", user_email: string = "", role: Role, approved: number = 0, speciality: string = "") {

        super (uid, name, last_name, age,  id_number, user_email, role);

        this.approved = approved;
        this.speciality = speciality;

    }

    public override getLiteralObjectRepresentation(): any {
        return {
            "uid": this.uid,
            "name": this.name,
            "last_name": this.last_name,
            "age": this.age,
            "id_number": this.id_number,
            "user_email": this.user_email,
            "role": this.role,
            "approved": this.approved,
            "speciality": this.speciality
        }
    }

}
