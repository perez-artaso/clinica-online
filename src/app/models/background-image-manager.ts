import { Utils } from "./utils";

export class BackgroundImageManager {

    private _preSettedSources: Array<string> = [];
    private _addedSources: Array<string> = [];

    constructor(preSettedSources: Array<string>) {
        this._preSettedSources = preSettedSources;
    }

    setNewSource(source: string) {
        if(source != "" && source) {
            this._addedSources.push(source);
        }
    }

    getRandomPreSettedImageSource(): string {

        return this._preSettedSources[
            Utils.getRandomIntInRange(0, this._preSettedSources.length - 1)
        ];

    }

    getRandomAddedImageSource(): string {

        return this._addedSources[
            Utils.getRandomIntInRange(0, this._addedSources.length - 1)
        ];

    }

    getPreSettedSources(): Array<string> {
        return this._preSettedSources;
    }

}
