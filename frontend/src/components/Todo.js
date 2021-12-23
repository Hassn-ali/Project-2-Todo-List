import React from 'react'

export default function Todo(props) {
    const {_id,
        title,
         isCompleted
        }=props.task
    return (
        <div className='Todo'>
            
           
           
            <input type="checkbox" checked={isCompleted}/>
<span style={{ textDecoration:isCompleted?
'line-through':"none" }}>{title}</span>
<button>X</button>
           
           
           
            {/* <form > */}
{/*               
            <><input type="checkbox" name="f"  value="Boat" checked/>  
            <label for="f">Title:<del>{title}</del></label> */}
            {/* <input type="checkbox"  ></input> 
            <label > I have a gg</label>
            <input type="checkbox"  ></input> 
            <label > I have a bb</label> */}
            {/* </> */}
            {/* </form> */}
        
            </div>
    )
}
