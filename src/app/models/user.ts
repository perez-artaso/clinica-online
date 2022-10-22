export class User {

    private _id: string = '';
    private _email: string;
    private _role: number;
    private _name: string;
    private _lastname: string;
    private _age: number;
    private _idNumber: string;

    constructor (email: string, role: number, name: string, lastname: string, age: number, idNumber: string) {
        this._email = email;
        this._role = role;
        this._name = name;
        this._lastname = lastname;
        this._age = age;
        this._idNumber = idNumber;
    }

    getId() {
        return this._id;
    }

    getEmail(): string {
        return this._email;
    }

    getRole(): number {
        return this._role;
    }

    getName(): string {
        return this._name;
    }

    getLastname(): string {
        return this._lastname;
    }

    getAge(): number {
        return this._age;
    }

    getIdNumber(): string {
        return this._idNumber;
    }

}
