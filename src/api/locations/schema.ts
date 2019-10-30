// tslint:disable:quotemark trailing-comma

export const location = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "name": {
            "type": "string"
        },
        "latitude": {
             "type": "number"
        },
        "longitude": {
            "type": "number"
        },
    },
    "required": ["id", "name", "latitude", "longitude"],
};

export const locationsArray = {
    "type": "array",
    "items": location,
};
