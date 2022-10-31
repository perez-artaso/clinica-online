import { Disponibility } from "./disponibility";

export class SpecialistDisponibility {

    constructor ( private id: string = "" , private specialistId: string = "", private disponibilities: Array<Disponibility> = [] ) {

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

}