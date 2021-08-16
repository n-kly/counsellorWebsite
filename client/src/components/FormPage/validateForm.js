import dayjs from "dayjs"

export default function validateInfo(info){
    let errors = {}
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(dayjs(info.aptDate).format('DD/MM/YYYY') === dayjs(new Date()).format('DD/MM/YYYY')){
        errors.date = "Date required"
    }
    if(info.booking.uniName  === ''){
        errors.uniName = "University name required"
    }
    if(info.booking.uniRepName  === ''){
        errors.uniRepName = "Name required"
    }
    if(info.booking.uniRepJobTitle  === ''){
        errors.uniRepJobTitle = "Job title required"
    }
    if(info.booking.uniRepEmail  === ''){
        errors.uniRepEmail = "Email required"

    } else if(!(regex.test(info.booking.uniRepEmail))){
        errors.uniRepEmail = "Invalid email"
    }
    if(info.booking.uniRegion === ''){
        errors.uniRegion = "Region required"
    }

    return errors;
}