import delete1 from '../images/delete.png';
import '../styles/DisplayEntries.css';

const TollEntries = (props)=>{
    const NoEntries = <tr className='rows'><td className='entries sm-col' colSpan={6}>No data</td></tr>
    const TableEntries = props.tolls.map((data,i)=>{
        return(
            <>
            <tr key={i} className="rows">
                <td className="lg-col">{data.tollname}</td>
                {
                    data.fare.map((d)=>{
                        return(
                            <td className='sm-col'>{`${d["singleJourney"]}/${d["returnJourney"]}`}</td>
                        )
                    })
                }
                <td className='sm-col'><button onClick={()=>props.deleteToll(data.tollname)}className='delete-btn'><img className="delete-i" src={delete1} alt="delete"/></button></td>
            </tr>
            
            </>
        )
    })
    return (
        <table className="table">
            <thead>
                <tr >
                    <td className="lg-col head">TOLL NAME</td>
                    <td className=' head'>CAR/JEEP/VAN</td>
                    <td className=' head'>LCV</td>
                    <td className=' head'>TRUCK/BUS</td>
                    <td className=' head'>HEAVY VEHICLE</td>
                    <td className= 'head '></td>
                </tr>
            </thead>
            <tbody>
          {props.tolls.length?TableEntries: NoEntries}
            
            </tbody>
        </table>
    )
}

const VehicleEntries = (props)=>{
    const NoEntries = <tr className='rows'><td className='entries sm-col' colSpan={5}>No data</td></tr>
    const TableEntries = props.entries.map((data,i)=>{
        return(
            <>
            <tr key={i} className="rows">
                <td className="lg-col">{data.vehicleType}</td>
                <td className='sm-col'>{data.vehicleNumber}</td>
                <td className='sm-col'>{`${new Date(data.time).toLocaleDateString()}, ${new Date(data.time).toTimeString().slice(0, 8)}`}</td>
                <td className='sm-col'>{data.tollname}</td>
                <td className='sm-col'>{data.tariff}</td>
            </tr>
            
            </>
        )
    })
    return (
        <table className="table">
            <thead>
                <tr >
                    <td className="lg-col head">VEHICLE TYPE</td>
                    <td className=' head'>VEHICLE NUMBER</td>
                    <td className=' head'>DATE/TIME</td>
                    <td className=' head'>TOLL NAME</td>
                    <td className=' head'>TARIFF</td>
                </tr>
            </thead>
            <tbody>
            {props.entries.length?TableEntries: NoEntries}
            </tbody>
        </table>
    )
}
export { TollEntries,VehicleEntries};