const express=require("express");
const cors=require ('cors');
const app=express();
const User=require('./models/User.js')
const mongoose=require("mongoose");
const imageDownloader=require('image-downloader');
const bcrypt=require('bcryptjs');
const PlaceModel = require("./models/Place.js");
// const jwt=require('jsonwebtoken');
// const cookieParser=require('cookie-parser');
const bcryptSalt=bcrypt.genSaltSync(10);
app.use(express.json());
// app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(express.urlencoded({extended:true}));
// const jwtSecret='A947921804820RTY';


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

// const corsOptions={
//     credentials:true,
//     origin:'https://127.0.0.1:5173',
//     optionsSuccessStatus:200
// };
// app.use(cors(corsOptions));
app.use(cors());
   
// app.options('*',cors(corsOptions));




// A08nycUPtmsx5DX5


app.get('/',(req,res)=>{
    res.send("test ok");
})
app.post("/api/register", async (req,res)=> {
    const{name,email,password}=req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            
            password:bcrypt.hashSync(password,bcryptSalt)
        });
        res.status(201).json(userDoc);
    } catch(e){
        res.status(422).json({error : e.message})
    }

//   app.post("/login",async(req,res)=>{
//     const {email,password}=req.body;
//     const userDoc= await User.findOne({email});
//     if(userDoc){
        
//         const passOk = bcrypt.compareSync(password, userDoc.password);
//         if(passOk){
//             jwt.sign({
//                 email:userDoc.email,
//                 id:userDoc._id,
//                 name:userDoc.name
//             }.jwtSecret, {},(err,token)=>{
//                 if(err) throw err;
//                 res.cookie('token',token).json('pass ok');
//              });
//             res.cookie('token','').json(data);
//     } else{
//         res.status(422).json('pass not ok');
//     }
// } else{
//     res.json('not found');
// }
//   })








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

app.post("/login", async (req,res)=>{
    const {email,password}=req.body;
    const userDoc= await User.findOne({email});
    if(userDoc){
        res.json('found');
    }
    else{
        res.json('not found');
    }

})

// app.post("/upload-by-link",async (req,res)=>{
//     const {link}=req.body;
//     const newName='photo'+Date.now() + '.jpg';
//     await imageDownloader.image({
//         url:link,
//         dest:__dirname + '/uploads'+ newName,
//     })
//     res.json(newName);
// })

// app.post('/logout/:id',async(req,res)=>{
//     let {id}=req.params;
//     let deletedUser= await useSyncExternalStore.findByIdAndDelete(id);
//     res.redirect("/login");

// })

app.post("/places",async(req,res)=>{
    try{
    const PlaceDoc= await PlaceModel.create({
        owner:req.body.owner,
        title:req.body.title,
        address:req.body.address,
        photos:req.body.photos,
        description:req.body.description,
        perks:req.body.perks,
        extraInfo:req.body.extraInfo,
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut,
        maxGuests:req.body.maxGuests,


    });
    res.status(201).json(PlaceDoc);
     } catch(e){
        res.status(422).json({error : e.message})
    }


})

app.listen(8080,(req,res)=>{
    console.log("app is listening on port 8080");
});