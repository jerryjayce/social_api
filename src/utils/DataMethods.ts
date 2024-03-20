export const convert_to_mutable: any = (immutable_data_object): object => {

    //check if object is empty
    if (Object.keys(immutable_data_object).length !== 0) {

        return JSON.parse(JSON.stringify(immutable_data_object));

    } else {

        return immutable_data_object;

    }
}