export class MainMap {
    map: L.Map;
    tileLayer: L.Layer;
    renderedMarkers = new Map<any, L.Marker>();
    layers = [];
    constructor() {}
}
