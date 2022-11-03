import { Appointment } from "./appointment";

export interface IActionRequest {
    action: string;
    appointment: Appointment;
}
