export interface IClinicalRecord extends Record<string, any> {
    id: string;
    uid: string;
    height: number;
    weight: number;
    temperature: number;
    bloodPressure: string;
    [key: string]: any;
}