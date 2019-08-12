export interface LatLng {
    readonly latitude: number;
    readonly longitude: number;
}

export interface ManualUserLocationStore {
    readonly manualUserLocation?: LatLng;
}