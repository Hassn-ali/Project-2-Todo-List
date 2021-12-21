import React ,{useState,useEffect} from 'react'
import './App.css'
import axios from 'axios'
import Todo from './components/Todo'
export default function App() {
 
  const [tasks,setTasks] = useState([])
 
 useEffect(() => {
  getData()
   
 }, [])
 
 
  const getData=()=>{
   /*should bring data using axios
   from backend (GET/tasks) */ 
 axios
 .get(`http://localhost:5000/tasks`)
.then((response) => {
  // console.log ('RESPONSE: ', response);
 console.log('DATA:' , response.data);
 setTasks(response.data)
})
.catch((err) => {
 console.log('ERR: ', err);
});
                     
 }
 const mapOverTasks=tasks.map((taskObj,i)=>(
  //  here the value return from Todo 
   <Todo key={i} task={taskObj}/>
 )
//  الكود اللي تحت اذا ابي ارجع القيمة من APP
  //{  return <p>{taskObj.title}</p>}
 );
  return (
    <div className='App'>
      <p>app</p>
      {/*عندما نضغط ينادي الفنكشن ويجلب البيانات */}
      <button onClick={getData}>GET TASKS</button>
   
{mapOverTasks}


    </div>
  )
}
