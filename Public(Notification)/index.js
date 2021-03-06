/* eslint-disable */

var firebaseConfig = {
  apiKey: "AIzaSyDQa7jQejd1eAi6Y-knWVuaw3L3nNBLRgY",
  authDomain: "jitsi-c6b81.firebaseapp.com",
  projectId: "jitsi-c6b81",
  storageBucket: "jitsi-c6b81.appspot.com",
  messagingSenderId: "198792555309",
  appId: "1:198792555309:web:eb39fbc387daf6d6e2c1a4",
  measurementId: "G-N5S8X5S0L5"
};
// Initialize Firebase
let db = firebase.initializeApp(firebaseConfig);
function GetRoomName() {
  // let room = '';
  

    let query = db.firestore().collection('Meeting').where("projectId", "==", 120);
    query.where("attended", "==", false).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // res(doc.data().roomName)
        // Notification Function
        console.log("Room found", doc.data().roomName);
        
        console.log(Notification.permission);
        if (Notification.permission === "granted") {
          showNotificatoin(doc.data().roomName);
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              showNotificatoin(doc.data().roomName);
            }
          });
        }

      })
    }
    )
  
}
function showNotificatoin(roomName) {
  localStorage.setItem('room-name',roomName)
  const notification = new Notification("New Meeting", {
    body: "Your customer waiting in virtual meeting room :"+roomName,
    requireInteraction : true,
    dir: "ltr",
    // renotify : true
  })
  notification.onclick = (e) => {
    // window.open(window.location.hostname+'/'+)
    db.firestore().collection('Meeting').doc(doc.data().roomName).set({
      attended: true,
    }, { merge: true });
  
  };
}


function StartJitsiMeeting(roomName) {
  // let meetingattend = false;
  let api;
  // let moderatorApi;
  // let userJWT = '';
  // let moderatorJwt = ''
  // let tenant = '';
  // const expoName = 'knowledge-village';

  
  const domain = 'meet.jit.si';
  const options = {

    roomName: roomName, //'vpaas-magic-cookie-88dfb7a7488f43a689e37d432fe97a85/test'
    width: '100%',
    height: '100%',
    moderator: 'false',
    parentNode: document.querySelector('#meet'),
    // jwt: userJWT,
    interfaceConfigOverwrite: {
      TOOLBAR_ALWAYS_VISIBLE: false,
      HIDE_INVITE_MORE_HEADER: true,
      SHOW_WATERMARK_FOR_GUESTS: true,
      TOOLBAR_TIMEOUT: 10000,
      INITIAL_TOOLBAR_TIMEOUT: 5000,
      SHOW_CHROME_EXTENSION_BANNER: false,
      VIDEO_QUALITY_LABEL_DISABLED: true,
      ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 5000,
      DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      HIDE_KICK_BUTTON_FOR_GUESTS: true,
      FILM_STRIP_MAX_HEIGHT: 120,
      DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
      DISABLE_FOCUS_INDICATOR: true,
      TILE_VIEW_MAX_COLUMNS: 4,
      TOOLBAR_BUTTONS: [
        'microphone', 'camera', 'fullscreen', 'raisehand',
        'filmstrip', 'desktop', 'chat',
        'tileview', 'hangup',
      ],
    },
  };
  api = new JitsiMeetExternalAPI(domain, options);

}
