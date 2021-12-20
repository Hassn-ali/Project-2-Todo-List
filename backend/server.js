const express=require('express');
const app=express()

const db=require('./db')
const Todo=require('./todo')
// console.log(Todo) 
app.use(express.json())

app.get('/',(req,res)=>{
    res.json('GET / is Working')
    
})
// جلب البيانات المخزنة في قاعدة البيانات
app.get("/tasks", (req, res) => {
  // .find 
    Todo.find({}, (err, data) => {
      if (err) {
        console.log("ERROR: ", err);
       } else {
        res.json(data);
    }});
});


// انشاء عنصر اضافي 
  app.post("/tasks", (req, res) => {
      
    console.log('25:',req.body);
   Todo.create(req.body, (err, newTask) =>{
         if (err) { 
   console.log("ERROR: ", err)   ;
          } else {
           res.status(201).json(newTask);
      }
   });
  });
  app.delete("/tasks/:id", (req, res) => {
    console.log('25:',req.params.id);

   Todo.deleteOne({_id:req.params.id}, (err, deleteObj) =>{
         if (err) { 
   console.log("ERROR: ", err)   ;
          } else {
            deleteObj.deletedCount  ===1
            ? res.json("Delete one todo successfully")
            : res.status(404).json("This todo is not found");
                                   
      }
   });
  });

  app.put("/tasks/:id", (req, res) => {
    // console.log('35:',req.params.id);
    //نحدد العنصر اللي نبي نغير عليه(نحدد العنصر وذالك باستخدامid:نحط موقع ويجيب id)----(فيtitle نحدد العنصر :نكتب كود ليستقبل البيانات ويجيبها ويخزنها )
   Todo.updateOne({_id:req.params.id},
    { title: req.body.newTitle },
     (err, updateObj) =>{
         if (err) { 
   console.log("ERROR: ", err)   ;
          } else {
            console.log(updateObj)
            updateObj.modifiedCount  ===1
            ? res.json("update one todo successfully")
            : res.status(404).json("This todo is not found");
                                   
      }
   });
  });
   



app.listen(5000,()=>{
    console.log('SERVER IS WORKING')
})