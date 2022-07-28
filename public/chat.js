const socket = io.connect("http://localhost:9000");
const roomid = document.getElementById('room').value


const joinroom = () => {
      socket.emit("joinroom", roomid);
      console.log(roomid)
    };

joinroom()