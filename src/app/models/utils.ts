export class Utils {

   public static getRandomIntInRange( min: number, max: number ) {

        return Math.floor(
            Math.random() * (max - min + 1) + min
        );

   }
    
}
