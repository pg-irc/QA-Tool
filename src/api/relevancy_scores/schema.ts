import { IncomingPostResponseSchema } from '../types';

// tslint:disable:quotemark trailing-comma

export const relevancyScore = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "value": {
            "type": "number"
        },
        "timestamp": {
             "type": "string"
        },
        "algorithm": {
            "type": "number"
        },
        "search_location": {
            "type": "number"
        },
        "user": {
            "type": "number"
        },
        "service_at_location": {
            "type": "number"
        },
        "topic": {
            "type": "string"
        }
    },
    "required": ["id", "value", "algorithm", "search_location", "service_at_location", "topic"],
};

export const relevancyScoreData: IncomingPostResponseSchema = {
    "type": "object",
    "items": relevancyScore,
};
