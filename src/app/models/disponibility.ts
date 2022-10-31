import { DailyDisponibility } from "./daily-disponibility";

export class Disponibility {

    constructor ( private specialityName: string = '', private dailyDisponibilities: Array<DailyDisponibility> = [] ) {

    }

    public getLiteralObjectRepresentation(): any {
        return {
            "specilityName": this.specialityName,
            "dailyDisponibilities": this.getDailyDisponibilitiesLiteralObjectRepresentation()
        }
    }

    private getDailyDisponibilitiesLiteralObjectRepresentation(): any {

        let disponibilityArray: any[] = [];

        this.dailyDisponibilities.forEach( (disponibility) => {
            disponibilityArray.push(
                disponibility.getLiteralObjectRepresentation()
            )
        });

        return disponibilityArray;
    }


}
