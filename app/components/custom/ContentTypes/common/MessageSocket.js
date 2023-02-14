import io from "socket.io-client";
import { globals } from "../../../../configs";

// const socket = io(globals.BASE_URL, { pingTimeout: 50000, jsonp: false });

const socket = io(globals.MESSAGE_SOCKET_URL, { jsonp: false});

function connect(screen,cb) {
  //listen for any messages coming through chat
  console.log("inside connect",screen)
  
  socket.on("communication-message-board-new-message-response", message => {
    console.log("communication-message-board-new-message-response: "+screen, message);
    cb(message);
  });
  messageHistory();

  //listem for subscribe new request
  // socket.on(
  //   "communication-notification-board-new-send-request-subscribe",
  //   subscribeNotification => {
  //     console.log("Notification Subscribe:", subscribeNotification);
  //   }
  // );
  // //listem for unsubscribe new request
  // socket.on(
  //   "communication-notification-board-new-cancel-request-subscribe",
  //   unsubscribeNotification => {
  //     console.log("Notification UNSubscribe:", unsubscribeNotification);
  //   }
  // );

  // socket.on("communication-notification-board-new-like", likeNotification => {
  //   console.log("Notification Like:", likeNotification);
  // });

  // socket.on("communication-notification-board-count-response", count => {
  //   console.log("Notification Count:", count);
  //   cb(count);
  // });
  socket.on('connect_error', (err) => {
    console.log('error123', err)
  });
}

function join(recipientId = null, senderId = null, userId) {
  console.log("IN JOIN:", senderId, recipientId);
  socket.emit("communication-message-board-join", {
    // room creation
    recipientId,
    senderId,
    userId: userId,
  });
  socket.emit("communication-notification-board-join", {
    userId
  });
}


function emit(
  senderId,
  recipientId,
  content
) {
  console.log("IN Socket - Emit");

  socket.emit("communication-message-board-new-message", {
    // to emit out messages
    recipientId,
    senderId,
    content
  });
}

function messageHistory(cb) {
  //listen for chat history

  socket.on("communication-message-board-history", (messageHistory) => {
    // to fetch the messages of history
    console.log("Vaibhav",messageHistory)
    // cb(messageHistory);
  });
}
function messagecount(userId, cb) {
  console.log("IN Socket - messagecount");
  socket.emit("communication-notification-board-count-request", {
    userId
  });
  // listen for any messages coming through chat
}
function isConnected() {
  if (socket.connected) {
    return true;
  } else {
    return false;
  }
}

function rejoin() {
  console.log("JOIN")
  socket.open();
}

function closeSocket() {
  socket.close();
}

export {
  connect,
  socket,
  join,
  emit,
  messagecount,
  messageHistory,
  isConnected,
  rejoin,
  closeSocket,
};
