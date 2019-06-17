export class MapSearchResult {
    public name: string;
    public lattitude: number;
    public longitude: number;

    static fakeOne() {
        const faked = Object.assign({}, new this());
        faked.name = 'Fake name ' + Math.floor(Math.random() * 100);
        faked.lattitude = Math.random() * 40;
        faked.longitude = Math.random() * 50;
        return faked;
    }
}
