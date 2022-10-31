export class DailyDisponibility {

    constructor( private day: number = 0, private from: number = 0, private to: number = 0 ) {

    }

    public getLiteralObjectRepresentation(): any {
        return {
            "day": this.day,
            "from": this.from,
            "to": this.to
        }
    }


}
