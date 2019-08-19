export type Name = string;
export type Value = string;

export type TopicsData = ReadonlyArray<URLTemplateData>;

export interface URLTemplateData {
    readonly [data: string]: Name;
}

export const topicsForQA: TopicsData = [
    {
        name: 'Get your BC Services Card', value: 'get-your-bc-services-card',
    },
    {
        name: 'Food Banks', value: 'food-banks',
    },
    {
        name: 'Public Libaries', value: 'public-libraries',
    },
    {
        name: 'Personal Safety', value: 'personal-safety',
    },
    {
        name: 'Where to Look for a Job', value: 'where-to-look-for-a-job',
    },
];