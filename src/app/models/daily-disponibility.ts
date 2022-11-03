export class DailyDisponibility {

    constructor( public day: number = 0, public from: number = 0, public to: number = 0 ) {

    }

    public getLiteralObjectRepresentation(): any {
        return {
            "day": this.day,
            "from": this.from,
            "to": this.to
        }
    }


}
