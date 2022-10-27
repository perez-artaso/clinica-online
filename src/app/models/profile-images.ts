export class ProfileImages {
    id: string = "";
    uid: string;
    images: Array<string>;

    constructor (uid: string = "", images: Array<string> = []) {
        this.uid = uid;
        this.images = images;
    }

    public getLiteralObjectRepresentation(): any {
        return {
            "uid": this.uid,
            "images": this.images
        }
    }

}
