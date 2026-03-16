import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateHandover() {

const navigate = useNavigate();

const [data,setData] = useState({
workgroup:"",
shiftDate:"",

currentShiftPerson:{
name:"",
userid:""
},

nextShiftPerson:[],
acknowledgementStatus:"Pending",

reports:[],
incidents:[],
alerts:[],
systemStatus:[],
pendingTasks:[],
changeRequests:[]
});



/* ---------------- BASIC HANDLERS ---------------- */

const handleBasicChange = (e)=>{
setData({...data,[e.target.name]:e.target.value})
}

const handleCurrentShift = (e)=>{
setData({
...data,
currentShiftPerson:{
...data.currentShiftPerson,
[e.target.name]:e.target.value
}
})
}



/* ---------------- ARRAY HANDLERS ---------------- */

const updateArray = (section,index,field,value)=>{
const updated=[...data[section]]
updated[index][field]=value
setData({...data,[section]:updated})
}

const addRow=(section,row)=>{
setData({...data,[section]:[...data[section],row]})
}

const removeRow=(section,index)=>{
const updated=[...data[section]]
updated.splice(index,1)
setData({...data,[section]:updated})
}



/* ---------------- SUBMIT ---------------- */

const handleSubmit = async(e)=>{
e.preventDefault()

try{

await axios.post("${import.meta.env.VITE_API_BASE_URL}/infra/handovers",data)

alert("Shift Handover Created Successfully")

navigate("/s2h/home")

}catch(err){

console.error(err)
alert("Error creating handover")

}

}



/* ---------------- UI ---------------- */

return(

<motion.div
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{duration:0.3}}
className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6"
>

<h1 className="text-xl font-semibold mb-6">Create Shift Handover</h1>

<form onSubmit={handleSubmit} className="space-y-6">


{/* BASIC INFO */}

<section className="space-y-3">

<h2 className="font-semibold text-sm uppercase">Basic Information</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<Input
type="date"
name="shiftDate"
value={data.shiftDate}
onChange={handleBasicChange}
required
className="input"
/>

<Input
name="workgroup"
placeholder="Workgroup"
value={data.workgroup}
onChange={handleBasicChange}
required
className="input"
/>

</div>

</section>



{/* CURRENT SHIFT */}

<section className="space-y-3">

<h2 className="font-semibold text-sm uppercase">Current Shift Person</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<Input
name="name"
placeholder="Name"
value={data.currentShiftPerson.name}
onChange={handleCurrentShift}
required
className="input"
/>

<Input
name="userid"
placeholder="User ID"
value={data.currentShiftPerson.userid}
onChange={handleCurrentShift}
required
className="input"
/>

</div>

</section>



{/* SECTIONS */}

<CollapsibleSection title="Next Shift Person">

<SectionTable
headers={["Name","User ID"]}
rows={data.nextShiftPerson}
onAdd={()=>addRow("nextShiftPerson",{name:"",userid:""})}
onRemove={(i)=>removeRow("nextShiftPerson",i)}
renderRow={(row,i)=>(

<>
<TableInput
value={row.name}
onChange={(e)=>updateArray("nextShiftPerson",i,"name",e.target.value)}
/>

<TableInput
value={row.userid}
onChange={(e)=>updateArray("nextShiftPerson",i,"userid",e.target.value)}
/>
</>

)}
/>

</CollapsibleSection>



<CollapsibleSection title="Reports">

<SectionTable
headers={["Title","Description"]}
rows={data.reports}
onAdd={()=>addRow("reports",{title:"",description:""})}
onRemove={(i)=>removeRow("reports",i)}
renderRow={(row,i)=>(

<>
<TableInput
value={row.title}
onChange={(e)=>updateArray("reports",i,"title",e.target.value)}
/>

<TableInput
value={row.description}
onChange={(e)=>updateArray("reports",i,"description",e.target.value)}
/>
</>

)}
/>

</CollapsibleSection>



<CollapsibleSection title="Incidents">

<SectionTable
headers={[
"Incident ID",
"Title",
"Status",
"Priority",
"Assigned To",
"Remarks"
]}

rows={data.incidents}

onAdd={()=>addRow("incidents",{
incidentId:"",
title:"",
status:"",
priority:"",
assignedTo:"",
remarks:""
})}

onRemove={(i)=>removeRow("incidents",i)}

renderRow={(row,i)=>(

<>
{["incidentId","title","status","priority","assignedTo","remarks"].map(f=>(

<TableInput
key={f}
value={row[f]}
onChange={(e)=>updateArray("incidents",i,f,e.target.value)}
/>

))}
</>

)}
/>

</CollapsibleSection>



<CollapsibleSection title="Alerts">

<SectionTable
headers={["Alert Name","Severity","Description","Remarks"]}

rows={data.alerts}

onAdd={()=>addRow("alerts",{
alertName:"",
severity:"",
description:"",
remarks:""
})}

onRemove={(i)=>removeRow("alerts",i)}

renderRow={(row,i)=>(

<>
{["alertName","severity","description","remarks"].map(f=>(

<TableInput
key={f}
value={row[f]}
onChange={(e)=>updateArray("alerts",i,f,e.target.value)}
/>

))}
</>

)}
/>

</CollapsibleSection>



{/* SAVE BUTTON */}

<motion.button
whileHover={{scale:1.04}}
whileTap={{scale:0.96}}
className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
>

Save Handover

</motion.button>

</form>

</motion.div>

)

}



/* ---------------- REUSABLE COMPONENTS ---------------- */


function CollapsibleSection({title,children}){

const [open,setOpen]=useState(true)

return(

<div className="border border-gray-200 rounded-md">

<button
type="button"
onClick={()=>setOpen(!open)}
className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100"
>

<span className="text-sm font-semibold uppercase">
{title}
</span>

<ChevronDown
size={18}
className={`transition-transform ${open ? "rotate-180":""}`}
/>

</button>


<AnimatePresence>

{open && (

<motion.div
initial={{height:0,opacity:0}}
animate={{height:"auto",opacity:1}}
exit={{height:0,opacity:0}}
className="overflow-hidden"
>

<div className="p-4">

{children}

</div>

</motion.div>

)}

</AnimatePresence>

</div>

)

}



function SectionTable({headers,rows,onAdd,onRemove,renderRow}){

return(

<div className="space-y-3">

<button
type="button"
onClick={onAdd}
className="border px-3 py-1 rounded hover:bg-gray-100 text-sm"
>

+ Add Row

</button>


<div className="w-full overflow-x-auto border rounded-md">

<table className="min-w-full text-sm">

<thead className="bg-gray-50">

<tr>

{headers.map(h=>(

<th key={h} className="px-3 py-2 text-left border-b whitespace-nowrap">
{h}
</th>

))}

<th className="px-3 py-2 border-b text-center">
Action
</th>

</tr>

</thead>


<tbody>

{rows.length===0 && (

<tr>

<td
colSpan={headers.length+1}
className="text-center py-4 text-gray-500"
>

No records added

</td>

</tr>

)}


{rows.map((row,i)=>(

<tr key={i} className="hover:bg-gray-50">

{renderRow(row,i)}

<td className="px-3 py-2 border-t text-center">

<button
type="button"
onClick={()=>onRemove(i)}
className="text-red-600 hover:underline"
>

Delete

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}



function TableInput({ value, onChange }) {
  return (
    <td className="px-3 py-2 border-t">
      <input
        value={value}
        onChange={onChange}
        className="
        w-full
        min-w-[140px]
        h-9
        px-2
        text-sm
        bg-white
        border border-gray-300
        rounded
        transition
        outline-none
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        hover:border-gray-400
        "
      />
    </td>
  );
}

function Input({ value, onChange, placeholder, type = "text", name }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
      w-full
      h-10
      px-3
      text-sm
      bg-white
      border border-gray-300
      rounded-md
      shadow-sm
      transition
      outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-200
      hover:border-gray-400
      "
    />
  );
}
