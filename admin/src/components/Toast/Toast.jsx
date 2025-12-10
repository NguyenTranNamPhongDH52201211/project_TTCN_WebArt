import React, {useEffect} from 'react'
import './Toast.css'

const Toast =({message, type = "success",onClose})=>{
    useEffect(()=>{
        const timer=setTimeout(()=>{
            onClose();
        },4000);

        return ()=> clearTimeout(timer);
    },[message]);

    return (
        <div className={`toast toast-${type}`}>
            <span>{message}</span>
            <button className='toast-close' onClick={onclose}>x</button>


        </div>
    )
}


export default Toast;