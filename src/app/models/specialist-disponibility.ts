import { Disponibility } from "./disponibility";

export class SpecialistDisponibility {
    private id: string = "" 

    constructor (public specialistId: string = "", public disponibilities: Array<Disponibility> = [] ) {

    }

    public getLiteralObjectRepresentation(): any {
        return {
            "specialistId": this.specialistId,
            "disponibilities": this.getDisponibilitiesLiteralObjectRepresentation()
        }
    }

    private getDisponibilitiesLiteralObjectRepresentation(): any {

        let disponibilityArray: any[] = [];

        this.disponibilities.forEach( (disponibility) => {
            disponibilityArray.push(
                disponibility.getLiteralObjectRepresentation()
            )
        });

        return disponibilityArray;
    }

    getDisponibilities(): Array<Disponibility> {
        return this.disponibilities;
    }

}