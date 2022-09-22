import {  useEffect, useState } from 'react';
import filter from '../images/filter.svg'
import search from '../images/search.svg'
import check from '../images/check.png'
import '../styles/actionbar.css'

const ListItem = (props)=>{

    return(
        <>
        <li  className="listitem" onClick={()=>{props.selectedItem(props.tollname)}} >{props.tollname}  
        <img className={`${props.tollname === props.activeItem?"icon-c active-inline":"icon-c"}`} src={check} alt="check"/>
        </li>
        </>
    )
}

const Actionbar = (props)=>{
    const [isOpen,setIsOpen] = useState(false)
    const [vehicleSearchTerm,setVechicleSearchTerm] = useState("")
    const [tollSearchTerm,setTollSearchTerm] = useState("")
    const tolls = props.tolls
    const {activeItem,setactiveItem} = props
    
    const listItems =  tolls.map((toll)=>{
        return (
            <ListItem
            tollname={toll.tollname}
            selectedItem={selectedItem}
            activeItem = {activeItem}
            />
        )
    })
   
        
         
        function selectedItem(Item)
        {
            setactiveItem(Item)
        }
   function vehicleSearchTermHandler(e){
        props.searchTermVehicle(e.target.value)
        setVechicleSearchTerm(e.target.value)
   }
   function tollSearchTermHandler(e){
        props.searchTermToll(e.target.value)
        setTollSearchTerm(e.target.value)
   } 
   const toggle =()=>{
        setIsOpen(!isOpen);
    }
    return (
        <>
        <div className="action">
        <div class="flex">
            <h4>{props.toggle?'Tollgate List':'Toll entries/Vechicle entries'}</h4>
            <span className="pipe">|</span>
            <div className={props.toggle?"hide-filter":"filter"}>
                <img src={filter} onClick={toggle} alt="filter-icon" className="icon-f"/>
                <div className={`${isOpen ? 'dropdown dropdownactive':'dropdown'}`}>
                <ul className='list'>
                <ListItem
                    tollname={"All"}
                    selectedItem={selectedItem}
                    activeItem = {activeItem}
            />
                   {listItems}
                </ul>
                </div>                  
            </div>
            <div className="searchbox">
            <img src={search} alt="search" className="icon-s"/>
            {props.toggle? <input type="text" className='input' placeholder='Search a toll' value={tollSearchTerm} onChange={tollSearchTermHandler} />:<input type="text" className='input' placeholder='Search vehicle' onChange={vehicleSearchTermHandler} value={vehicleSearchTerm}/>}
           
        </div>
        </div>
        <div className='flex m-l gap-20'>
            <button className='btn' onClick={props.displayVehicle}>Add vechicle entry</button>
            <button className='btn'onClick={()=>{props.addToll(); setIsOpen(false)}}>Add new toll</button>
            <button className='btn' onClick={()=>{props.Togglefn(); setIsOpen(false)}}>{props.toggle?'Back to vehicle logs':'View all tolls'}</button>
        </div>
        </div>
        <hr/>

        </>
    );
}
export default Actionbar;