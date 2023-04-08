import ApiManager from "./api";
import { _store_data, _retrieve_data } from "../handler/storage_handler";

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
                'Content-Type': 'application/json'
            },
            params: {
                age: data.age,
                bb: data.bb,
                tb: data.tb,
                jk: data.jk
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const user_accumulation_report = async data => {
    
    try {
        const result = await ApiManager('accumulation-repor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                mm: data.mm,
                yyyy: data.yyyy
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const user_measurmet = async data => {
    try {
        const result = await ApiManager('', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const user_measurmentBy_uuid = async data => {
    try {
        const result = await ApiManager('', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                uuid: data.uuid
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const user_measurment_report = async data => {
    try {
        const result = await ApiManager('accumulation-repor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                yyyy: data.yyyy
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const get_growthBy_uuid = async data => {
    try {
        const result = await ApiManager('growth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                uuid: data.uuid
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}


const get_articleBy_category = async data => {
    try {
        const result = await ApiManager('article', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                category: data.category
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const get_articleBy_uuid = async data => {
    try {
        const result = await ApiManager('article', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                uuid: data.uuid
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const get_puskesmas = async data => {
    try {
        const result = await ApiManager('puskesmas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const get_puskesmasBy_uuid = async data => {
    try {
        const result = await ApiManager('puskesmas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                uuid: data.uuid
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const get_posyandu = async data => {
    try {
        const result = await ApiManager('posyandu', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

const get_posyanduBy_uuid = async data => {
    try {
        const result = await ApiManager('posyandu', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                uuid: data.uuid
            }
        })
        return result
    } catch(error) {
        return error.response.data
    }
}

export {
        user_login,
        user_calculator,
        user_accumulation_report,
        user_measurmet,
        user_measurmentBy_uuid,
        user_measurment_report,
        get_growthBy_uuid,
        get_articleBy_category,
        get_articleBy_uuid,
        get_puskesmas,
        get_puskesmasBy_uuid,
        get_posyandu,
        get_posyanduBy_uuid    
    }