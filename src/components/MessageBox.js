
import { useEffect, forwardRef } from "react";
import alert from '../images/alert1.PNG'
import alert1 from '../images/alert.png'
import "../styles/MessageBox.css"
const MessageBox = forwardRef((props,ref)=>{
  const {show,close,setErrorMessage} = props
  
  useEffect(() => {
      const timer = setTimeout(() => {
        
        close()
      setErrorMessage("","")
      }, 2000);
      return () => clearTimeout(timer);
    }, [show,close,setErrorMessage]);
    
  
    if(!show)
            return (
              <></>
            )
  
    
      
   
    return (
        <>
        <div className={"error-Box errorBoxshow"} style={{backgroundColor: props.type === 'error' ? 'rgb(253, 237, 237)':'rgb(229, 246, 253)',color:props.type==='error'?'rgb(95, 33, 32)':'rgb(1, 67, 97)'}}>
           
           <div>
            <img src={ props.type=== 'error'?alert:alert1} alt="close"/>
           </div>
           <div>
            {props.message}
           </div>
        </div>
        </>
    )
})
export default MessageBox;