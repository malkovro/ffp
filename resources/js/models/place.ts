export class Place {
    public id?: number;
    public name: string = '';
    public location: { lat: null; long: null };
    public description: string;
    public ratings?: any = []; // Should create ratings object with score author, comment etc

    constructor(fill: any = {}) {
        Object.keys(fill).forEach(key => {
            this[key] = fill[key];
        });
    }
}
