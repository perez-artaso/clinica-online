import { DailyDisponibility } from "./daily-disponibility";
import { Disponibility } from "./disponibility";

export class SpecialistDisponibility {

    constructor (public specialistId: string = "", public disponibilities: Array<Disponibility> = [], public id: string = ""  ) {

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

    public static FromLiteralObject(object: any): SpecialistDisponibility {

        let _specialistDisp = new SpecialistDisponibility(object.specialistId, [], object.id);
        let _disponibilities: Disponibility[] = [];

        for (let i = 0; i < object.disponibilities.length; i++) {
            
            let newDisp = new Disponibility(object.disponibilities[i].specialityName, []);

            for (let j = 0; j < object.disponibilities[i].dailyDisponibilities.length; j++ ) {
                newDisp.dailyDisponibilities.push(
                    new DailyDisponibility(object.disponibilities[i].dailyDisponibilities[j].day, object.disponibilities[i].dailyDisponibilities[j].from, object.disponibilities[i].dailyDisponibilities[j].to)
                );
            }

            _disponibilities.push(newDisp);
            
        }

        _specialistDisp.disponibilities = _disponibilities;

        return _specialistDisp;
        
    }

}