import { BackgroundImageManager } from "./background-image-manager";

export class WelcomePageBgImgManager extends BackgroundImageManager {

    constructor () {

        super([
            "assets/background-images/bg-1.jpg",
            "assets/background-images/bg-2.jpg",
            "assets/background-images/bg-3.jpg",
            "assets/background-images/bg-4.jpg",
            "assets/background-images/bg-5.jpg",
            "assets/background-images/bg-6.jpg",
            "assets/background-images/bg-7.jpg",
            "assets/background-images/bg-8.jpg"
        ]);
        
    }

}
