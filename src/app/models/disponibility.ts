import { DailyDisponibility } from "./daily-disponibility";

export class Disponibility {

    constructor ( public specialityName: string = '', public dailyDisponibilities: Array<DailyDisponibility> = [] ) {

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

    public getDailyDisponibilities(): Array<DailyDisponibility> {
        return this.dailyDisponibilities;
    }


    getSpecialityName(): string {
        return this.specialityName;
    }

}
