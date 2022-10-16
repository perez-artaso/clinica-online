import { IUserError } from "./iuser-error";

export class LoginErrors {

    INVALID_EMAIL: IUserError;
    WRONG_PASSWORD: IUserError;
    USER_NOT_FOUND: IUserError;
    EMAIL_REQUIRED: IUserError;
    PASSWORD_REQUIRED: IUserError;
    OTHER: IUserError;

    constructor () {

        this.INVALID_EMAIL = {
            ocurred: false,
            message: "El formato del email ingresado no es válido."
        };

        this.WRONG_PASSWORD = {
            ocurred: false,
            message: "Contraseña equivocada."
        };

        this.USER_NOT_FOUND = {
            ocurred: false,
            message: "Usuario inexistente."
        };

        this.EMAIL_REQUIRED = {
            ocurred: false,
            message: "Email requerido."
        };

        this.PASSWORD_REQUIRED = {
            ocurred: false,
            message: "Contraseña requerida."
        };

        this.OTHER = {
            ocurred: false,
            message: "Ha ocurrido un error."
        };

    }

    ClearErrors() {

        Object.entries(this).forEach(
            ([key, value]) => {
                value.ocurred = false;
            }
        );

    }

    HasError(): boolean {

        let hasError: boolean = false;

        Object.entries(this).forEach(
            ([key, value]) => {
                if (value.ocurred == true) {
                    hasError = true;
                }
            }
        );

        return hasError;

    }

}