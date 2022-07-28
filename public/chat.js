const socket = io.connect("http://localhost:9000");
const roomid = document.getElementById('room').value

// Fetch previous chats for the room first
// so you can populate a div that should contain the messages

const joinroom = () => {
      socket.emit("joinroom", roomid);
      console.log(roomid)
};
// this should only happen once, when the user opens the page / clicks submit the first time
joinroom()