import { useEffect, useState } from "react"
import axios from 'axios';
import CCard from "./CCard";
import CCardAdd from "./CCardAdd";

const EditEmail = () => {
    const [emails, setEmails] = useState([])

    useEffect(async () => {
        async function getEmail(){
            let res = await  axios.get('http://localhost:5000/couns/read')
            return res
        }

        getEmail().then((res)=>setEmails(res.data))
    }, [])

    return (
        <div className='container'>
            <div className='row pad'>
                {emails.map(instance=>{
                    return(
                      <CCard instance={instance} setEmails={setEmails}/>  
                    )
                })}
                <CCardAdd setEmails={setEmails}/>
            </div>
        </div>
    )
}

export default EditEmail
