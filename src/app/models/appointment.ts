import { AppointmentStatus } from "./appointment-status";

export class Appointment {

    id: string = "";
    timestamp: string;
    duration: number;
    idSpecialist: string;
    idPatient: string;
    speciality: string;
    specialistCommentary: string;
    patientComentary: string;
    calification: number;
    status: AppointmentStatus;

    constructor (timestamp: string = "", duration: number = 0,  idPatient: string = "", idSpecialist: string = "", speciality: string = "", calification: number = 0, specialistCommentary: string = "", patientComentary: string = "", status = 0) {
        this.timestamp = timestamp;
        this.duration = duration;
        this.idPatient = idPatient;
        this.idSpecialist = idSpecialist;
        this.speciality = speciality;
        this.specialistCommentary = specialistCommentary;
        this.patientComentary = patientComentary
        this.calification = calification;
        this.status = status;
    }

    public getLiteralObjectRepresentation(): any {
        return {
            "timestamp": this.timestamp,
            "duration": this.duration,
            "idPatient": this.idPatient,
            "idSpecialist": this.idSpecialist,
            "speciality": this.speciality,
            "specialistCommentary": this.specialistCommentary,
            "patientComentary": this.patientComentary,
            "calification": this.calification,
            "status": this.status
        }
    }

    getStatusAsString (): string {
        switch (this.status) {
            case 0: return "Solicitado";
            case 1: return "Cancelado";
            case 2: return "Rechazado";
            case 3: return "Aceptado";
            case 4: return "Realizado";
            default: return "Desconocido";
        }
    }


}
