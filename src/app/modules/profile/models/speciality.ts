export class Speciality {
    id: string = "";
    name: string;

    constructor (name: string = "") {
        this.name = name;
    }

    public getLiteralObjectRepresentation(): any {
        return {
            "name": this.name
        }
    }



}