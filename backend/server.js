require("dotenv").config();
const express=require("express");
const {UserModel,TodoModel}=require("./db");
const {auth}=require("./auth");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
const app=express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt=require("bcrypt");
app.post('/signup',async function(req,res){
    const { email, password, name } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            msg: "Email and password required"
        });
    }
    const hashedPassword=await bcrypt.hash(password,5);
    try{
        await UserModel.create({
            email,
            password:hashedPassword,
            name
        });
        res.json({
            msg:"you are succesfully signed up"
        });
    }
    catch(e){
        res.status(400).json({
            msg: "User already exists"
        });
    }
});
app.post('/signin',async function(req,res){
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            msg: "Email and password required"
        });
    }
    const user = await UserModel.findOne({
        email
    });
    if(user && await bcrypt.compare(password, user.password)){
        const token=jwt.sign({
            id:user.id.toString()
        },process.env.JWT_SECRET);
        res.json({
            token:token
        });
    }else{
        res.status(403).json({
            msg:"Incorrect credentials"
        });
    }
});
app.post('/todo', auth, async function(req, res){
    try {
        const userId = req.userId;
        const { title, done } = req.body;

        await TodoModel.create({
            userId,
            title,
            done: done ?? false, 
            createdAt: new Date()
        });

        res.json({ message: "Todo created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/todos', auth, async function(req, res){
    try {
        const todos = await TodoModel
            .find({ userId: req.userId })
            .sort({ createdAt: -1 });

        res.json({ todos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/todo/:id", auth, async (req, res) => {
  try {
    const { title, done } = req.body;

    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        $set: {
          ...(title !== undefined && { title }),
          ...(done !== undefined && { done })
        }
      },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Updated", todo: updatedTodo });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/todo/:id", auth, async (req, res) => {
  await TodoModel.deleteOne({
    _id: req.params.id,
    userId: req.userId
  });
  res.json({ message: "Deleted" });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
