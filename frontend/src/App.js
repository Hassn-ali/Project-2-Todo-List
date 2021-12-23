import React ,{useState,useEffect} from 'react'
import './App.css'
import axios from 'axios'
import Todo from './components/Todo'
import Add from './components/Add'

export default function App() {
 
  const [tasks,setTasks] = useState([])
  // const [oneDelete,setOneDelete] = useState([])
 
 useEffect(() => {
  getData()
  // deleteOneData()
   
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

// ----------------------------------------------------------
 const postNewTodo = (body) => {
  // console.log("func postNewTodo from APP");
  // {"title":"task 5","isCompleted": false}
                     
   axios
   .post(`http://localhost:5000/tasks`,body)
   .then( (response) => {
    // console.og('RESPONSE: ', response);
     console.log("DATA: ", response.data);
    // setTasks(response.data);
  getData()
  })
.catch((err) => {
console.log('ERR: ', err);
});
                    
}





// ----------------------------------------------
// حذف عنصر واحد
// const deleteOneData=()=>{
//   axios
//   .delete(`http://localhost:5000/tasks/`) 
//  .then((response) => {
//    // console.log ('RESPONSE: ', response);
//   console.log('DATA:' , response.data);
//   setOneDelete(response.data)
//  })
//  .catch((err) => {
//   console.log('ERR: ', err);
//  });
// }
// const mapDeleteTasks=oneDelete.map((deleteObj,i)=>
//   //  here the value return from Todo 
  //  <Todo key={i} task={taskObj}/>


// //  الكود اللي تحت اذا ابي ارجع القيمة من APP
  // {  return <p>{deleteObj._id}</p>}
//  );



  return (
    <div className='App'>
      <p>app</p>
       <Add createFunc={postNewTodo}/>
       {/*عندما نضغط ينادي الفنكشن ويجلب البيانات */}
      <button onClick={getData}>GET TASKS</button>
      {/* <button onClick={deleteOneData}>delete</button> */}
  
{mapOverTasks}
{/* {mapDeleteTasks} */}

    </div>
  )
}
