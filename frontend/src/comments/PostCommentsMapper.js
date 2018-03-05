/**
 * Function converts array of objects to dictionary with post id's as keys
 * @param data
 */
export const mapJsonToComments = (data) => {
    try {
        return data.reduce((accumulator, currentValue) => {
            accumulator[currentValue.id] = currentValue;
            return accumulator;
        }, {});
    } catch (error) {
        return null;
    }
};
