const router = require('express').Router()
const person = require("../model/user");
const message = require("../model/chat");
const Room = require("../model/room");


router.get("/chat/:id", async (req, res) => {
    const {id} = req.params
  const userid = req.user.number;
  const friendid = id;
  const roomid = Math.random();
  console.log("from react :", userid, friendid, roomid);

  try {
    const userRoom = await Room.findOne({
      member: { $all: [userid, friendid] },
    });

    if (userRoom) {
      console.log("room exist");
      res.render('chat',{userRoom})
    } else {
      const newroom = await new Room({
        room: roomid,
        member: [userid, friendid],
      });
      const saveroom = await newroom.save();
         const useroom = await Room.findOne({
           member: { $all: [userid, friendid] },
         });
      console.log(saveroom,);
      console.log('new user room cretaed and rendered')
         res.render("chat", {useroom});
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/users", async (req, res) => {
  try {
     const people = await person.find();
   res.render('user', {people})
  
  } catch (err) {
   console.log(err)
  }
});
router.post("/chat", async (req, res) => {
  const { chat } = req.body;
  try {
    const messag = await new message({
        chat:chat,
        member:['rose', 'godswill']
    }) ;
    const msg = await messag.save()
    console.log(msg)
  
  } catch (err) {
   console.log(err)
  }
});

router.get("/chats", async (req, res) => {
  try {
  const chats = await message.find()
  console.log(chats)
  res.json(chats)
  } catch (err) {
    console.log(err);
  }
});

router.get("/onechats", async (req, res) => {
  try {
    const chats = await message.find({member: {$all :['peter', 'emma']}});
    console.log(chats);
    res.json(chats);
  } catch (err) {
    console.log(err);
  }
});


router.post("/message", async (req, res) => {
  const userid = req.body.userId;
  const friendid = req.body.friendId;
  const roomid = Math.random();
  console.log("from react :", userid, friendid, roomid);

  try {
    const userRoom = await Room.findOne({ member: { $all: [userid, frienid] } });

    if (userRoom) {
      
      console.log("room exist");

    } else {
      const newroom = await new Room({
        room: roomid,
        member: [userid, friendid],
      });
      const saveroom = await newroom.save();
     console.log(saveroom)
    
    }
  } catch (error) {
    console.log(error);
  }
});



module.exports = router