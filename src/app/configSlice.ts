import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeConfig } from "../types";

const initialState = {
  usName: "STELS",
  usDescription: "Description",
  usType: "WEB 3.0",
  usActive: true,
  usVersion: "0.0.1",
  usDomain: "//stels.app",
  usGit: {
    usUrl: "https://github.com/chabanov/web.stels.app.git"
  },
  usLanguage: {
    usDefault: "en",
    usPacks: [
      {
        usName: "English",
        usKey: "en",
        usLocale: "en-US",
        usPhrases: [
          {
            usKey: "app.logo",
            usValue: "Huragan"
          },
          {
            usKey: "app.welcome",
            usValue: "Welcome to my Application"
          },
          {
            usKey: "app.title",
            usValue: "WEB 3.0 Title"
          }
        ]
      }
    ]
  },
  usUrls: {
    usVersion: "v1",
    usServers: {
      usSignal: "wss://signal.gliesereum.com/",
      usApi: "//api.stels.app",
      usAccount:"//wallet.stels.app"
    }
  },
  usDataStorage: {
    usType: "localStorage",
    usBrowserWindow: "CONFIG",
    usKeys: {
      usAppConfig: "@usAppConfigKey:",
      usAppLanguage: "@usAppLanguage:",
      usAppTheme: "@usAppTheme:"
    }
  },
  usAuthor:{
    usFullName: "Pavlo Chabanov",
    usEmail: "pavlo@huragan.info",
    usPhone: "+380991234567"
  },
  usCopyright: "Huragan LLC"
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
    set: (state, action: PayloadAction<TypeConfig>) => {
      return action.payload;
    },
    update: (state, action: PayloadAction<Partial<TypeConfig>>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const {reset, set, update} = configSlice.actions;

export default configSlice.reducer;
