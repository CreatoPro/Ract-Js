import { useEffect,useState } from "react"
import FormFunctions from "../common/FormFunctions"
import ApiService from "./ApiService"

const useGetData = (url,setMessage,count) => {

    const [loading,setLoading] = useState(true)
    const [data,setData] = useState()
    const [error,setError] = useState(null)


    useEffect(() => {
        setLoading(true)
        ApiService.getData(url)
        .then(res => {
            console.log(res)
            return res.data
        })
        .then(data => {
            if(data.status === 1)
            {
                setData(data.data)
            }
            else{
                throw Error(data.data)
            }
            setLoading(false)
            setError(null)
            console.log(data)
        })
        .catch(e => {
            setLoading(false)
            setError(e.message)
        })
    },[count,url])

    return({data,loading,error})
}

export default useGetData;