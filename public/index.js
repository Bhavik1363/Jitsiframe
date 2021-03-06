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


function StartJitsiMeeting(roomName) {
  let meetingattend = false;
  let api;
  let moderatorApi;
  let userJWT = '';
  let moderatorJwt = ''
  let tenant = '';
  
  const expoName = 'knowledge-village'
  let promise = new Promise((res, rej) => {
    db.firestore().collection('Meeting').doc(roomName).set({
      roomName: roomName,
      attended: false,
      projectId: 120,
    }).then(() => {
      console.log('room',roomName);
      res('data send')
    })
  })


  promise.then((res) => {
    console.warn('alkdfsj')
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

  })
}



// export function StartJitsiMeetingForModerator(roomName) {
//   const domain = '8x8.vc';
//   const options = {
//     roomName: tenant + '/' + roomName, //'vpaas-magic-cookie-88dfb7a7488f43a689e37d432fe97a85/test'
//     width: '100%',
//     height: '100%',
//     parentNode: document.querySelector('#meet'),
//     jwt: moderatorJwt,
//     interfaceConfigOverwrite: {
//       TOOLBAR_ALWAYS_VISIBLE: false,
//       HIDE_INVITE_MORE_HEADER: true,
//       SHOW_WATERMARK_FOR_GUESTS: true,
//       TOOLBAR_TIMEOUT: 10000,
//       INITIAL_TOOLBAR_TIMEOUT: 5000,
//       SHOW_CHROME_EXTENSION_BANNER: false,
//       VIDEO_QUALITY_LABEL_DISABLED: true,
//       ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 5000,
//       FILM_STRIP_MAX_HEIGHT: 120,
//       DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
//       DISABLE_FOCUS_INDICATOR: true,
//       TILE_VIEW_MAX_COLUMNS: 4,
//       TOOLBAR_BUTTONS: [
//         'microphone', 'camera', 'fullscreen', 'raisehand',
//         'filmstrip', 'desktop', 'chat',
//         'tileview', 'mute-everyone', 'etherpad'
//       ],
//     },
//   };
//   moderatorApi = new JitsiMeetExternalAPI(domain, options);
// }

// export function updateJwtAndTenant(roomName) {
//   console.warn('onload function')
//   const db = dbFirebaseApp.firestore();
//   const userCollection = db.collection('MedexLive');
//   let ExistingUserQuery = new Promise((resolve, reject) => {
//     userCollection.where('expo', '==', expoName)
//       .get()
//       .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//           // console.log(doc.id, " => ", doc.data());
//           let myData = doc.data();
//           myData.id = doc.id;
//           resolve(myData);
//         });
//         resolve('Not Found');
//       })
//       .catch(function (error) {
//         reject(error);
//       });
//   });
//   ExistingUserQuery.then(result => {
//     if (result === 'Not Found') {
//       console.warn('not found')
//     } else {
//       // commonFunction(PAGETYPE.LOBBY);

//       if (result) {
//         userJWT = result.jwtUser;
//         moderatorJwt = result.jwt;
//         tenant = result.tenant;
//         console.warn('userjwt ', userJWT)
//         console.warn('moderator ', moderatorJwt)
//         console.warn('tenant ', tenant)
//         StartJitsiMeeting(roomName)


//       } else {
//         console.warn('not found')
//       }
//     }
//   }).catch(error => {
//     console.error('Already existing user check error', error);
//   });
// }



// export function updateJwtAndTenantForModerator(roomName) {
//   console.warn('onload function')
//   const db = dbFirebaseApp.firestore();
//   const userCollection = db.collection('MedexLive');
//   let ExistingUserQuery = new Promise((resolve, reject) => {
//     userCollection.where('expo', '==', expoName)
//       .get()
//       .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//           // console.log(doc.id, " => ", doc.data());
//           let myData = doc.data();
//           myData.id = doc.id;
//           resolve(myData);
//         });
//         resolve('Not Found');
//       })
//       .catch(function (error) {
//         reject(error);
//       });
//   });
//   ExistingUserQuery.then(result => {
//     if (result === 'Not Found') {
//       console.warn('not found')
//     } else {
//       // commonFunction(PAGETYPE.LOBBY);

//       if (result) {
//         userJWT = result.jwtUser;
//         moderatorJwt = result.jwt;
//         tenant = result.tenant;
//         // console.warn('userjwt ', userJWT)
//         // console.warn('moderator ', moderatorJwt)
//         // console.warn('tenant ', tenant)
//         StartJitsiMeetingForModerator(roomName)


//       } else {
//         console.warn('not found')
//       }
//     }
//   }).catch(error => {
//     console.error('Already existing user check error', error);
//   });
// }

// export function startLivestream(){
//   moderatorApi.executeCommand('startRecording', {
//     mode: 'stream',
//     rtmpStreamKey: 'rtmp://54.163.94.221:1935/LiveStreamingwithMediaStore/stream'
//   });
// }

// export function stopLivestream() {
//   moderatorApi.executeCommand('stopRecording', 'stream');
// }