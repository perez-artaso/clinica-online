import { Profile } from "./profile";
import { Role } from "./role";

export class SpecialistProfile extends Profile {

    approved: number;
    specialities: Array<string>;

    constructor ( uid: string = "", name: string = "", last_name: string = "", age: number = 0,  id_number: string = "", user_email: string = "", role: Role = 1, approved: number = 0, specialities: Array<string> = []) {

        super (uid, name, last_name, age,  id_number, user_email, role);

        this.approved = approved;
        this.specialities = specialities;

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
            "specialities": this.getSpecialitiesLiteralObjectRepresentation()
        }
    }

    private getSpecialitiesLiteralObjectRepresentation () {
        
        let specialitiesArray: any[] = [];

        this.specialities.forEach( (speciality) => {
            specialitiesArray.push(
                speciality
            )
        });

        return specialitiesArray;

    }

    public static FromLiteralObject(literalObj: any) {
        let newSpecialist = new SpecialistProfile(
            literalObj.uid, 
            literalObj.name, 
            literalObj.last_name, 
            literalObj.age, 
            literalObj.id_number, 
            literalObj.user_email, 
            literalObj.role, 
            literalObj.approved, 
            literalObj.specialities
        );

        newSpecialist.setId(literalObj.id);

        return newSpecialist;
    }
    

}
