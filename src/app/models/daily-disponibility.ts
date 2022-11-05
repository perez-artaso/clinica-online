export class DailyDisponibility {

    constructor( public day: number = 0, public from: string = "", public to: string = "" ) {

    }

    public getLiteralObjectRepresentation(): any {
        return {
            "day": this.day,
            "from": this.from,
            "to": this.to
        }
    }


}
