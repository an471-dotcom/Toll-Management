import '../styles/AddToll.css'


import React from 'react';

 class AddToll extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            show:false,
            formdata:{
                tollname:"",
                fare: new Array(4).fill().map(
                    ()=>(
                        {"vehicleType":"0",
                        "singleJourney":"",
                        "returnJourney":""
                    })
                    )
            },
            error:"",
            tollnameError:false
        }

        this.optionsArr = ['Car/Jeep/Van','LCV','Truck/Bus','Heavy vehicle']
       

        this.hidePopup = this.hidePopup.bind(this)
        this.displayPopup = this.displayPopup.bind(this)
        this.selectedValue = this.selectedValue.bind(this)
        this.submithandler = this.submithandler.bind(this)
        this.handleNamechange = this.handleNamechange.bind(this)
        this.SinglejourneyHandler = this.SinglejourneyHandler.bind(this)
        this.ReturnjourneyHandler = this.ReturnjourneyHandler.bind(this)
        // this.validateSingleJourney = this.validateSingleJourney.bind(this)
    }




    
    displayPopup(){
            this.setState({show:true})
    }
    
    hidePopup(){
        this.setState({show:false,formdata:{tollname:"",fare: new Array(4).fill().map(()=>({"vehicleType":"0","singleJourney":"","returnJourney":""}))},error:"", tollnameError:false})
    }
     submithandler(e)
    {
        e.preventDefault()
        const {fare} = this.state.formdata
        if(fare.find(fa=>fa.vehicleType === "0"))
        {
            this.setState({error:'Select all vechicle types'})
            return
        }
        if(this.state.tollnameError) {
            this.setState({error:'Toll name already exists'})
            return
        }
        this.setState({error:''})
        this.props.addToll(this.state.formdata)
        this.hidePopup()
        this.props.showToll()
       
        
    }
    selectedValue(e){
        const {name,value} = e.target
        const {formdata} = this.state
        const {fare} = formdata
        if(fare.find((f)=>f.vehicleType === value))
        {
            this.setState({error:'select a different type'})
            return
        }
        this.setState({error:''})
        fare[name].vehicleType=value
        formdata.fare = fare
        this.setState({formdata:formdata})
       
    }
    handleNamechange(e){
        const {formdata} = this.state
        formdata.tollname = e.target.value
        this.setState({formdata:formdata})
        if(this.props.tolls.length && this.props.tolls.find((toll)=>toll.tollname.toLowerCase() === this.state.formdata.tollname.toLowerCase()))
        {
                this.setState({error:'Toll already exists'})
                this.setState({tollnameError:true})
                return
        }
        this.setState({error:''})
        this.setState({tollnameError:false})
    }
    validateNumber(args){
        const {value} = args;
            
           return (!isNaN(value) && (parseInt(value) >= 0)) || value === ''
    }
 
    SinglejourneyHandler(e)
    {
        const {name,value} = e.target
        if(this.validateNumber(e.target)){
            const {formdata} = this.state
            const {fare} = formdata
            fare[name].singleJourney=value
            formdata.fare = fare
            this.setState({formdata:formdata})
        }

    }
    ReturnjourneyHandler(e){
        const {name,value} = e.target
        if(this.validateNumber(e.target)){
            const {formdata} = this.state
            const {fare} = formdata
            fare[name].returnJourney=value
            formdata.fare = fare
            this.setState({formdata:formdata})
        }
    }
    render() {
    return(
        <>
        <div className={`${this.state.show?"backdrop":"backdrop-nor"}`}>

        </div>
        <div 
            className={`${this.state.show?"form-popup active":"form-popup"}`}
             id="myForm">
        <form 
            onSubmit={this.submithandler} 
            className="form-container">

            <h3 className="headline">Add New Toll</h3>
            <label for="toll"><b>Toll Name <span className="red">*</span></b></label>
            <div className='tollerror'>{this.state.error}</div>
            <input 
                    type="text"
                    placeholder="Enter Toll Name" 
                    name="toll" 
                    value={this.state.formdata.tollname} 
                    onChange={this.handleNamechange} 
                    className={this.state.tollnameError?"error":""}
                    required/>
        
        <div className="vehicle"> 
            <label for="vehicle"><b>Vehicle fare details <span className="red">*</span></b></label> </div>
        <div className="vehicleFare">
            <select name="0"  id="vehicle1" defaultValue={"0"} onChange={this.selectedValue}  value={this.state.formdata.fare[0].vehicleType} className="fareData"required>
                <option value="0"disabled  hidden>Select vehicle type</option>
                {
                    this.optionsArr.map((option)=>{
                        
                        return(
                            <option value={option}>{option}</option>
                        )            
                                                
                    })
                }
            </select>
    
        <input className="fareData" type="number" placeholder="Single Journey" min='1' value={this.state.formdata.fare[0].singleJourney} onChange={this.SinglejourneyHandler} name="0"  required/>
        <input className="fareData" type="number" placeholder="Return Journey" min='1' value={this.state.formdata.fare[0].returnJourney} onChange={this.ReturnjourneyHandler}name="0" required/>
        </div>

        <div className="vehicleFare">
            <select name="1"  id="vehicle2"defaultValue={"0"} onChange={this.selectedValue}  value={this.state.formdata.fare[1].vehicleType}className="fareData"required>
                <option value="0" disabled  hidden>Select vehicle type</option>
                {
                    this.optionsArr.map((option)=>{
                        
                        return(
                            <option value={option}>{option}</option>
                        )            
                        
                                                                                
                    })
                }
            </select>
        <input className="fareData" type="number" placeholder="Single Journey"value={this.state.formdata.fare[1].singleJourney} onChange={this.SinglejourneyHandler} name="1" required/>
        <input className="fareData" type="number" placeholder="Return Journey" value={this.state.formdata.fare[1].returnJourney}onChange={this.ReturnjourneyHandler} name="1" required/>
        </div>
        <div className="vehicleFare">
            <select name="2"  id="vehicle3" defaultValue={"0"} onChange={this.selectedValue}  value={this.state.formdata.fare[2].vehicleType} className="fareData" required>
                    <option value="0" disabled  hidden>Select vehicle type</option>
                    {
                        this.optionsArr.map((option)=>{
                            
                            return(
                                <option value={option}>{option}</option>
                            )            
                                                                                
                        })
                    }
                </select>
        <input className="fareData" type="number" placeholder="Single Journey" value={this.state.formdata.fare[2].singleJourney} onChange={this.SinglejourneyHandler} name="2" required/>
        <input className="fareData" type="number" placeholder="Return Journey" value={this.state.formdata.fare[2].returnJourney}onChange={this.ReturnjourneyHandler} name="2" required/>
        </div>
        <div className="vehicleFare">
            <select name="3"  id="vehicle4" defaultValue={"0"} onChange={this.selectedValue}  value={this.state.formdata.fare[3].vehicleType} className="fareData"required>
                    <option value="0" disabled hidden>Select vehicle type</option>
                    {
                        this.optionsArr.map((option)=>{
                        
                            return(
                                <option value={option}>{option}</option>
                            )            
                                                                                
                        })
                    }
                </select>
            <input className="fareData" type="number" placeholder="Single Journey" value={this.state.formdata.fare[3].singleJourney} onChange={this.SinglejourneyHandler} name="3" required/>
            <input className="fareData" type="number" placeholder="Return Journey" value={this.state.formdata.fare[3].returnJourney}onChange={this.ReturnjourneyHandler} name="3" required/>
        </div>
    <button type="submit" class="btn">Add Details</button>
    <button type="button" class="cancel" onClick={this.hidePopup}>X</button>
    
        </form>
        </div>
        </>
    )
    }
 }

export default AddToll;