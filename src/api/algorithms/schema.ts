import { IncomingDataSchema } from "../types";

// tslint:disable:quotemark trailing-comma

export const algorithm = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "url": {
            "type": "string"
        },
        "name": {
             "type": "string"
             },
        "notes": {
            "type": ["string", "null"]
        }
    },
    "required": ["id", "url"],
};

export const algorithmsArray: IncomingDataSchema = {
    "type": "array",
    "items": algorithm,
};
