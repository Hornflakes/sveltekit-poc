export interface Country {
    name: string;
}

export const adaptCountry = (input: never): Country => {
    return {
        name: input['name']['common'],
    };
};

export const adaptCountries = (input: never[]): Country[] => {
    return input.map((x) => adaptCountry(x));
};
