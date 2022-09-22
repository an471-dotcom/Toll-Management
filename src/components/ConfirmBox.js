
import '../styles/ConfirmBox.css'
const ConfirmBox =(props)=>{
    

    function buttonhandler(value){
    props.closeConfirm(value)

    }
    return (    
        <>
        <div className="confirmbox-backdrop">
       
        </div>
         <div className="confirm-box">
        <h2>Delete</h2>
         <p>Are you sure you want to delelte this toll?</p>
         <div className="buttons">
         <button className="cancel-btn" onClick={()=>buttonhandler("cancel")}>cancel</button>
         <button className="ok-btn" onClick={()=>buttonhandler("Ok")}>Ok</button>
         </div>
        
     </div>
     </>
    )   
}

export default ConfirmBox;