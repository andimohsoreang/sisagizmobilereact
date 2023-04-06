import ApiManager from "./api";

const user_login = async data => {
    try {
        const result = await ApiManager('login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
        return result
    }catch(error){
        return error.response.data
    }
}

const user_calculator = async data => {
    try {
        const result = await ApiManager('calculator', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            },
            data: data
        })
        return result
    }catch(error){
        return error.response.data
    }
}

export { user_login, user_calculator}