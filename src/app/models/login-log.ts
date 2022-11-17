export class LoginLog {

    id: string = "";
    uid: string;
    timestamp: string;

    constructor (uid: string, timestamp: string) {
        this.uid = uid;
        this.timestamp = timestamp;
    }

    public getLiteralObjectRepresentation(): any {
        return {
            "uid": this.uid,
            "timestamp": this.timestamp 
        }
    }

}