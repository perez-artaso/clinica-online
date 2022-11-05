import { DailyDisponibility } from "./daily-disponibility";

export class Disponibility {

    constructor ( public specialityName: string = '', public dailyDisponibilities: Array<DailyDisponibility> = [] ) {

    }

    public getLiteralObjectRepresentation(): any {
        return {
            "specialityName": this.specialityName,
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

    public worksOn(day: number): boolean {

        for (let i = 0; i<this.dailyDisponibilities.length; i++) {
            if (this.dailyDisponibilities[i].day == day) {
                return true;
            }
        }

        return false;
    }

    public static FromLiteralObject(object: any): Disponibility {
        return new Disponibility(object.specialityName, object.dailyDisponibilities);
    }

    getFromByDay(day: number): string {

        for (let i = 0; i<this.dailyDisponibilities.length; i++) {
            if (this.dailyDisponibilities[i].day == day) {
                return this.dailyDisponibilities[i].from;
            }
        }

        return "";
    }

    getToByDay(day: number): string {

        for (let i = 0; i<this.dailyDisponibilities.length; i++) {
            if (this.dailyDisponibilities[i].day == day) {
                return this.dailyDisponibilities[i].to;
            }
        }
        
        return "";
    }

    addDay(day: number) {

        let exists = false;

        for (let i = 0; i<this.dailyDisponibilities.length; i++) {
            if (this.dailyDisponibilities[i].day == day) {
                exists = true;
            }
        }

        if (!exists) {
            this.dailyDisponibilities.push(new DailyDisponibility(day, "", ""));
        }

    }

    removeDay(day: number) {

        for (let i = 0; i<this.dailyDisponibilities.length; i++) {
            if (this.dailyDisponibilities[i].day == day) {
                this.dailyDisponibilities = this.dailyDisponibilities.slice(0, i).concat(this.dailyDisponibilities.slice(i+1));
            }
        }

    }

    setFrom(day: number, from: string) {
        for (let i = 0; i<this.dailyDisponibilities.length; i++) {
            if (this.dailyDisponibilities[i].day == day) {
                this.dailyDisponibilities[i].from = from;
            }
        }
    }

    setTo(day: number, to: string) {
        for (let i = 0; i<this.dailyDisponibilities.length; i++) {
            if (this.dailyDisponibilities[i].day == day) {
                this.dailyDisponibilities[i].to = to;
            }
        }
    }

    public static validHour(hour: string): IInputtedHourEvaluation {

        if (hour.match(/^[0-9]{1,2}:[0-9]{1,2}$/)) {
            const numericalHours = Number(hour.split(":")[0]);
            const numericalMinutes = Number(hour.split(":")[1]);
            if ( numericalHours > 23 || numericalHours < 0) {
                return {
                    wrongFormat: false,
                    hoursOutOfRange: true,
                    minutesOutOfRange: false,
                    everythingOk: false
                }
            }

            if ( numericalMinutes > 59 || numericalMinutes < 0) {
                return {
                    wrongFormat: false,
                    hoursOutOfRange: false,
                    minutesOutOfRange: true,
                    everythingOk: false
                }
            }

        } else return {
            wrongFormat: true,
            hoursOutOfRange: false,
            minutesOutOfRange: false,
            everythingOk: false
        }

        return {
            wrongFormat: false,
            hoursOutOfRange: false,
            minutesOutOfRange: false,
            everythingOk: true
        }

    }

}


export interface IInputtedHourEvaluation {
    wrongFormat: boolean;
    hoursOutOfRange: boolean;
    minutesOutOfRange: boolean;
    everythingOk: boolean;
}
