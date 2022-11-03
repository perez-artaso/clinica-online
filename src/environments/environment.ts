// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDLRMJzVNDBZhZoRxlPK6VRWzaG_hZVzcE",
    authDomain: "clinica-online-f088a.firebaseapp.com",
    projectId: "clinica-online-f088a",
    storageBucket: "clinica-online-f088a.appspot.com",
    messagingSenderId: "997385672796",
    appId: "1:997385672796:web:5920385801f0ed02b26e99"
  },
  quickAccessUsers: [
    {
      email: "audwcymmowjrndhnff@tmmwj.com",
      password: "123456"
    },
    {
      email: "ksiidepztdjducydyi@tmmcv.com",
      password: "123456"
    },
    {
      email: "perez.artaso@gmail.com",
      password: "clinica123"
    },
    {
      email: "twnlwvbbfsvirxdlaw@tmmcv.com",
      password: "123456"
    },
    {
      email: "dyetmwnsfzdkdtklxm@tmmwj.com",
      password: "123456"
    },
    {
      email: "ggphvidcwgztlimlhr@tmmbt.net",
      password: "123456"
    }
  ],
  templateImg: "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",
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
