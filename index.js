const express=require("express");
const cors=require ('cors');
const app=express();
const User=require('./User.js')
const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');
// const bcryptSalt=bcrypt.genSaltSync(10);
app.use(express.json());
app.use(express.urlencoded({extended:true}));


main()
.then(()=>{
    console.log("connection successfull");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}


app.use(cors)
    // credentials:true,
    // origin:'https://127.0.0.1:5173',


// A08nycUPtmsx5DX5


app.get('/',(req,res)=>{
    res.send("test ok");
})
app.post("/api/register", async (req,res)=> {
    const{name,email,password}=req.body;
    await User.insertOne({name:name,email:email,password:password})










    // try{
    //  const userDoc= new User({
    //     name,
    //     email,
    //     password,
    //  })
    //  await User.insertMany([userDoc])
    //  userDoc.save()
    //  .then((res)=>{
    //     console.log("Your userDoc is created");
        //   res.json(userDoc);
    //  })
    //  .catch((err)=>{
    //     console.log(err);
    //  })
// }
//     catch(e){
//         res.status(422).json(e);
    // res.json({userDoc});
    // UserModel.create(req.body)
    // .then(employees=> res.json(employees))
    // .catch(err=>res.json(err))
    // }
})

app.post("api/login", async (req,res)=>{
    const {email,password}=req.body;
    const userDoc= await User.findOne({email});
    if(userDoc){
        res.json('found');
    }
    else{
        res.json('not found');
    }

})

app.listen(8080,(req,res)=>{
    console.log("app is listening on port 8080");
});