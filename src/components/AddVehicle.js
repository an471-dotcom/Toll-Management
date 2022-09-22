import '../styles/AddVehicle.css'
import { forwardRef, useImperativeHandle,useEffect, useState,useRef } from "react";


const AddVehicle =forwardRef((props,ref)=>{
    const inputEl = useRef(null);
    const {tolls} = props
    const {entries} = props
    
    const optionsArr = ['Car/Jeep/Van','LCV','Truck/Bus','Heavy vehicle']
    const [show,setShow] = useState(false)
    const [tollname,setTollName] = useState(tolls.length?tolls[0].tollname:"")
    const [vehicleType,setVehicleType] = useState(optionsArr[0])
    const [vehicleNumber,setVehicleNumber] = useState("")
    const [vechicleNumberValidate,setvechicleNumberValidate]=useState(false)
    const [time,setTime] = useState(Date.now())
    const [tariff,setTariff] = useState('')
   
    
    
    useEffect(()=>{
        if(vechicleNumberValidate){
       
        setTime(Date.now())
        const result =    tolls.find((toll)=> toll.tollname === tollname).fare.find((fa)=> fa.vehicleType === vehicleType)
        const prevEntry = entries.filter((entry)=>entry.vehicleNumber === vehicleNumber).sort((a,b) => b.time - a.time)[0]
        
            if(prevEntry) {
                const timedifference = (new Date(time) - new Date(prevEntry.time))/60000 ;
                if(prevEntry.tollname === tollname && timedifference <= 60 && prevEntry.tariff ===  result.singleJourney){
                    setTariff(result.returnJourney)
                    return
                }
            }
               
            setTariff(result.singleJourney)
            return
        }
        setTariff("")
    },[tollname,vehicleType,vehicleNumber,tolls,vechicleNumberValidate,entries,time])
    
    useImperativeHandle(ref, () => ({

        displayPopup()
        {
            inputEl.current.className = ''
            setShow(true)
            setTollName(tolls[0].tollname)
        }
    
      }));
    function initializeState(){
        setTollName(tolls[0].tollname)
        setVehicleNumber("")
        setVehicleType(optionsArr[0])
        setTime(Date.now())
        setvechicleNumberValidate(false)
    }
    function hidePopup(){
       initializeState()
        setShow(false)
    }
    function handleSubmit(e){
        e.preventDefault()
        if(tariff){
            const result = {tollname,vehicleNumber,vehicleType,time,tariff}
            props.addEntries(result)
            initializeState()
            hidePopup()
            props.showVehicle()
        }
    }  
    function vehicleNumberHandler(e)
    {
        
        inputEl.current.className = 'started'
        setvechicleNumberValidate(false)
        setVehicleNumber(e.target.value)
        const regex = new RegExp(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/);
       if(regex.test(e.target.value)){
            
            setvechicleNumberValidate(true)
            inputEl.current.className = ''
       }
    } 
    return (
        
        <>
         <div className={show?"backdrop1 show1":"backdrop1"}></div>
      <div className={show?"form show":"form"}>
        
        <form onSubmit={handleSubmit}>
        <h3 className="headline">Add new entry</h3>
        <div className="flex-col">
            <label>Select toll name<span  className='red' >*</span></label>
            <select value={tollname} onChange={(e)=>{ setTollName(e.target.value)}}>
                {
                tolls.map((toll)=>{
                    return (
                        <option value={toll.tollname}>{toll.tollname}</option>
                    )
                })
            }
            </select>
        </div>
        <div className="flex-col">
            <label>Select vehicle type<span className='red'>*</span></label>
            <select value={vehicleType} onChange={(e)=>{setVehicleType(e.target.value)}}>
                {
                optionsArr.map((option)=>{
                    return (
                        <option value={option}>{option}</option>
                    )
                })
            }
            </select>
        </div>
        <div className="flex-col"> 
            <label>Vehicle Number <span className='red'>*</span></label>
            <input type="text" ref={inputEl} id="vehiclenumber" maxLength=""onChange={vehicleNumberHandler} onBlur={()=>inputEl.current.className = ''}value={vehicleNumber}placeholder='Enter your vehicle number'/>
        </div>
        <div className="flex-col"> 
            <label>Tariff <span className='red'>*</span></label>
            <input type="text" placeholder='Tariff amount' value={tariff} disabled/>
        </div>
        <button className={!vechicleNumberValidate?'btn-vehicle disable':'btn-vehicle'}  disabled={!vechicleNumberValidate}>Add Entry</button>
        <button onClick={hidePopup} type="button"className="close-btn" >X</button>
        </form>
      </div>
        </>
      
    )
})

export default AddVehicle;