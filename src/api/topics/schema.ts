// tslint:disable:quotemark trailing-comma

export const topic = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
    },
    "required": ["id"],
};

export const topicsArray = {
    "type": "array",
    "items": topic,
};
