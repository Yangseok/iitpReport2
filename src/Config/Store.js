/**
 * 리덕스 설정 관련 레퍼런스 주소
 * https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
 */
import {configureStore, combineReducers} from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import counterReducer from 'Domain/Home/Sample/Status/CounterSlice';
import msgReducer from 'Domain/Home/Common/Status/MsgSlice';
import commonReducer from 'Domain/Home/Common/Status/CommonSlice';
import discoveryReducer from 'Domain/Home/Discovery/Status/DiscoverySlice';
import demandReducer from 'Domain/Home/DemandBanking/Status/DemandSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 6,
  storage,
  // whitelist: [],
  // todo: api 관련 상태값은 로컬스토리지에 저장하지 않도록 하겠다.
  blacklist: ['msg','discovery'],
};

const rootReducer = combineReducers({
  counter: counterReducer,
  msg: msgReducer,
  common: commonReducer,
  discovery: discoveryReducer,
  demand: demandReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    // }).concat(logger),
    }),
});
export const pst = persistStore(store);
export default store;
