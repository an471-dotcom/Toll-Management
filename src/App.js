import { useEffect } from 'react';
import { useState ,useRef} from 'react';
import './App.css';
import Actionbar from './components/Actionbar';
import AddToll from './components/AddToll';
import Header from './components/Header';
import {TollEntries,VehicleEntries} from './components/DisplayEntries';
import AddVehicle from './components/AddVehicle';
import MessageBox from './components/MessageBox';
import ConfirmBox from './components/ConfirmBox';

function App() {
  const TollRef = useRef();
  const VehicleRef = useRef();

  const tollNameRef = useRef()
  var tollsdata = JSON.parse(localStorage.getItem('tolls'))
  var entriesdata = JSON.parse(localStorage.getItem('entries'))

  const [tolls,setTolls] = useState(tollsdata?tollsdata:[])
  const [entries,setEntries] = useState(entriesdata?entriesdata:[])
  const [toggle,setToggle] = useState(false)
  const [ActiveItem,setActiveItem] = useState("All")
  const [filteredItem,setFilteredItem] = useState([])
  const [searchTermVehicle,setSearchTermVehicle] = useState("")
  const [searchVehicleResults,setSearchVehicleResults] = useState([])
  const [searchTermToll,setSearchTermToll] = useState("")
  const [searchTollResults,setSearchTollResults] = useState([])
  const [showMessage,setShowMessage] = useState(false)
  const [errorMessage,setErrorMessage] = useState({message:"",type:""})
  const [opendialog,setOpenDialog] = useState(false)
  

  useEffect(()=>{
    localStorage.setItem('tolls',JSON.stringify(tolls))
  
  },[tolls])

  useEffect(()=>{
    localStorage.setItem("entries",JSON.stringify(entries))
  },[entries])

  useEffect(()=>{
    if(ActiveItem === 'All')
    {
      setFilteredItem(entries)
      return
    }
    var result = entries.filter((entry)=> entry.tollname === ActiveItem)
    setFilteredItem(result)
  },[ActiveItem,entries])
  
  useEffect(()=>{
    if(searchTermVehicle === ''){
      setSearchVehicleResults(filteredItem)
      return
    }
   
    var searchResults = filteredItem.filter((item)=> item.vehicleNumber.toLowerCase().includes(searchTermVehicle.toLowerCase()))
    setSearchVehicleResults(searchResults)
  },[searchTermVehicle,filteredItem])

  useEffect(()=>{
    if(searchTermToll === '')
    {
      setSearchTollResults(tolls)
      return
    }
  
    var searchResults = tolls.filter((toll) => toll.tollname.toLowerCase().includes(searchTermToll.toLowerCase()))
    setSearchTollResults(searchResults)
  },[searchTermToll,tolls])
 
  


  const addToll = (toll)=>{
    setTolls([...tolls,toll])
    setErrorMessage({message:"Toll added ",type:"noerror"})
    setShowMessage(true)
  }
  const addEntries = (entry)=>{
    setEntries([...entries,entry])
    setErrorMessage({message:"Vechicle added ",type:"noerror"})
    setShowMessage(true)
   
  }
  function displayToll(){
    
      TollRef.current.displayPopup();
  }
  function displayVehicle(){
   if(tolls.length)
    VehicleRef.current.displayPopup();
    else{
      setErrorMessage({message:"No tolls Found",type:"error"})
      setShowMessage(true)
    }
  }
  function Toggletable(){
    setToggle(!toggle)
  }
  function showVehicle(){
    setToggle(false)
  }
  function showToll(){
    setToggle(true)
  }
  function setActiveFilter(toll){
    setActiveItem(toll)
  }

  function deleteToll(value)
  {
    setOpenDialog(true)
    tollNameRef.current = value
  
  }
  function deleteActulatoll(value){
    var result = tolls.filter((toll)=> toll.tollname !== value)
    setTolls(result)
    var result1 = entries.filter((entry)=> entry.tollname !== value)
    setEntries(result1)
    setActiveItem('All')

  }
  function searchTermHandler(term){
    setSearchTermVehicle(term)
  }
  function searchTermTollHandler(term){
    setSearchTermToll(term)
  }
  function closeMessage(){
    setShowMessage(false)
  }
  function setErrorMessageFunction(message,type){
  
    setErrorMessage({message:message,type:type})
  }
  function closeConfirm(value){
    console.log(value)
      if(value === 'Ok'){
      
        deleteActulatoll(tollNameRef.current)
      }
      setOpenDialog(false)
  }
  return (
    <>
    <Header/>
    <Actionbar 
            tolls={tolls} 
            addToll ={displayToll} 
            displayVehicle={displayVehicle} 
            toggle={toggle} 
            Togglefn={Toggletable}
            activeItem={ActiveItem}
            setactiveItem={setActiveFilter}
            searchTermVehicle={searchTermHandler}
            searchTermToll={searchTermTollHandler}
    />
    <AddToll 
            ref={TollRef} 
            tolls={tolls} 
            addToll={addToll}
            showToll={showToll}
    />
    { toggle ? 
              <TollEntries deleteToll={deleteToll} tolls={searchTollResults}/> 
              : 
              <VehicleEntries entries={searchVehicleResults} tolls={tolls}/>
      }
    <AddVehicle 
            ref={VehicleRef} 
            tolls={tolls} 
            entries={entries} 
            addEntries={addEntries} 
            showVehicle = {showVehicle}
    />
   <MessageBox message={errorMessage.message} type={errorMessage.type} setErrorMessage = {setErrorMessageFunction}show={showMessage}close={closeMessage}/>
   {opendialog?<ConfirmBox closeConfirm={closeConfirm}/>:<></>}
   
    </>
    
  );
}

export default App;
