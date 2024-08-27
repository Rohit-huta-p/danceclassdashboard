const formError = (data) => {
    const errors = [];
    Object.entries(data).forEach(([field, value]) => {
        if(!value){
            errors.push(field);
        }
    })
    return errors

}


export default formError;