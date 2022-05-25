import '../Styles/Vedionote.css'
import {useState,useContext} from 'react';
import Notesdata from './Notesdata';
import UserDataContext from '../Context/UserData/UserDataContext';
export default function Vedionote(props){
/*State declaration */
const userData = useContext(UserDataContext);
const [addBtn,setAddBtn]=useState(false);
const [data,setData]=useState("Enter your note here...");
const [noteArray,setNoteArr]=useState([]);
// useEffect(() => {
//     getDataFromBackend()
// })
const updateData=(e)=>{
props.pauseVid()
setData(e.target.value);
}
const chgState=()=>{
    document.getElementById('outerContainer').style.display="block";
    setAddBtn(true);
}
const removeData=(id)=>{
    setNoteArr(()=>{
        return(
            noteArray.filter((val,index)=>{
                return index!==id;
                })
        )
    })
    storeDataToBackend()
}
const addNote=()=>{
    if(data==="Enter your note here..." || data.length<=0){
    alert("Enter the valid data in notes .....");
    }else{
    setNoteArr((prev)=>{
        return[
        ...prev,
        data
        ]
    }) 
    storeDataToBackend()
    props.playVid();
    setData(" ");
    console.log(noteArray.toString())
}   
}
async function storeDataToBackend() {
    let userObject = {
        "email": localStorage.getItem("userEmail"),
        "notes_value":noteArray.toString()
    }
    await fetch(`${userData.backendApi}/saveQuickNotes/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObject),
    }).then(response => response.json()).then((data) => {
     console.log(data)
    })
}
async function getDataFromBackend() {
    let userObject = {
        "email": localStorage.getItem("userEmail")
    }
    await fetch(`${userData.backendApi}/getQuickNotes/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObject),
    }).then(response => response.json()).then((data) => {
     console.log(data)
     console.log(data.response[0].notes_value.split(","))
     setNoteArr((prev)=>{
     return[
     ...prev,
     ...data.response[0].notes_value.split(",")
     ]
     })
    })
}
if(addBtn===true)
{
return(
    <>
<div style={{padding:"23px"}}>
  <div style={{display:"flex",flexDirection:"column"}}>
  {/* <button type="button" onClick={storeDataToBackend} class="btn btn-success" style={{marginBottom:"10px"}}>Save current Notes</button> */}
  <button type="button" onClick={getDataFromBackend} class="btn btn-primary" style={{marginBottom:"10px"}}>Get Saved Notes</button>
  </div>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" cols="30" onChange={updateData} value={data} ></textarea>
  <svg xmlns="http://www.w3.org/2000/svg" id="addLogo" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16" style={{marginTop:"20px"}} onClick={addNote}>
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
{
noteArray.map((val,index)=>{
return (
    <>
<Notesdata noteData={val} deleteData={removeData} id={index}/>
</>
)
})
}

</div>
    </>
)
}else{
return(
    <>
<div className="list-group" id="outerContainer">
<svg xmlns="http://www.w3.org/2000/svg" id="addLogo1" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16" onClick={chgState}>
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
</div>
    </>
)
}
}