export class Speciality {
    id: string = "";
    name: string;
    image: string;

    constructor (name: string = "", image: string = "") {
        this.name = name;
        this.image = image;
    }

    public getLiteralObjectRepresentation(): any {
        return {
            "name": this.name,
            "image": this.image
        }
    }

}
