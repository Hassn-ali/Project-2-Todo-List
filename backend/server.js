const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db");
const Todo = require("./todo");
const User = require("./user");
// console.log(Todo)
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("GET / is Working");
});


// CRUD: Create, Read, Update, Delete.
// express:get, post, delete, put,.
// mongoose: وسيط بين (MongoDB)وبين expressمثل العمليات جلب البانات اضافة حذف تحديث الداخليه لexpress.

// الاسم الذي يطلق على اللي تحت اسمه (endpoint)

// جلب جميع البيانات المخزنة في قاعدة البيانات
app.get("/tasks", (req, res) => {
  // .find
  Todo.find({}, (err, data) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.json(data);
    }
  });
});


app.get("/filter", (req, res) => {
  console.log(req.query);
  Todo.find({isCompleted:req.query.isCompleted}, (err, data) => {
    if (err) {
      console.log("ERR: ", err);
    } else {
      res.json(data);
    }
  });
});


/*
 the up endpoint is replace to these two


app.get("/completed/:type", (req, res) => {
  Todo.find({isCompleted:req.params.type}, (err, data) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.json(data);
    }
  });
});
app.get("/not_completed/:type", (req, res) => {
  
  Todo.find({isCompleted:req.params.type}, (err, data) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.json(data);
    }
  });
});
*/
// انشاء عنصر اضافي
app.post("/tasks", (req, res) => {
  console.log("25:", req.body);
  Todo.create(req.body, (err, newTask) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.status(201).json(newTask);
    }
  });
});
// حذف العنصر 
app.delete("/tasks/:id", (req, res) => {
  console.log("25:", req.params.id);

  Todo.deleteOne({ _id:req.params.id }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      deleteObj.deletedCount === 1
        ? res.json("Delete one todo successfully")
        : res.status(404).json("This todo is not found");
    }
  });
});

app.delete("/tasks/", (req, res) => {
  // console.log("37:", req.params.id);
  Todo.deleteMany({ isCompleted: true }, (err, deleteObj)=> {
     if (err) {
       console.log("ERROR: ", err);
      } else {
       console.log(deleteObj);
       deleteObj.deletedCount === 0
          ? res.status(404).json("There is no completedtodo found")
          : res.json("Delete all completed todos successfully");
   }}
  )})

//تحديث العنصر  (محدد)(العنصر الجديد)

app.put("/tasks/:id", (req, res) => {
  // console.log('35:',req.params.id);
  //نحدد العنصر اللي نبي نغير عليه(نحدد العنصر وذالك باستخدامid:نحط موقع ويجيب id)----(فيtitle نحدد العنصر :نكتب كود ليستقبل البيانات ويجيبها ويخزنها )
  Todo.updateOne(
    { _id: req.params.id },
    { title: req.body.newTitle },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err)
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ? res.json("update one todo successfully")
          : res.status(404).json("This todo is not found");
      }
    }
  );
});

app.put("/tasks/:id/:isCompleted", (req, res) => {
  console.log("124:", req.params);
  Todo.updateOne(
     { _id: req.params.id },
    { isCompleted: req.params.isCompleted },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
       } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
           ? res.json("Update one todo successfully")
           : res.status(404).json("This todo is not found")
      }
    }
  )
});


// endpoint to the module User
// تسجيل مستخدم جديد
app.post("/users/register", (req, res) => {
  User.create(req.body, (err, newUser) => {
    if (err) {
      // console.log("ERROR: ", err);
      res.status(400).json({ message: "This email already taken" });
    } else {
      // res.status(201).json(newUser);
      res.status(201).json({ message: "Create New User Successfully" });
    }
  });
});

// التاكد من التسجيل
app.post("/users/login", (req, res) => {
  User.find({ email: req.body.email }, (err, arrUserFound) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      // console.log(arrUserFound);
      if (arrUserFound.length === 1) {
        // we found the user
        if (req.body.password === arrUserFound[0].password) {
          // password correct
          res.status(200).json({
            message: "Login Successfully",
            username: arrUserFound[0].username,
          
          });
        } else {
          // password incorrect
          res.status(400).json({
            message: "Wrong password",
          });
        }
      } else {
        res.status(404).json({
          message: "The email entered is not registered",
        });
      }
    }
  });
});
app.listen(5000, () => {
  console.log("SERVER IS WORKING");
});
