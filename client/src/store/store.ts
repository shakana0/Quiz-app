import {
  combineReducers,
  configureStore,
  AnyAction,
  Reducer,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/Modal/AuthSlice";
import modalReducer from "../features/Modal/ModalSlice";
import quizReducer from "../features/singleQuiz/QuizSlice";

// const persistConfig = {
//   key: "persist-key",
//   storage,
//   whitelist: ["auth"],
// };

// const reducer = combineReducers({
//   modal: modalReducer, //modal är namnet som användes i useSelector för att komma åt state => state.modal
//   quiz: quizReducer,
//   auth: authReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// export default configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

/************ */
// const appReducer = combineReducers({
//   modal: modalReducer,
//   quiz: quizReducer,
//   auth: authReducer,
// });

// const persistedReducer = persistReducer(persistConfig, appReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk],
// });

// export const persistor = persistStore(store);
// persistor.pause();
// persistor.flush().then(() => {
//   return persistor.purge();
// });

/************ */

export default configureStore({
  reducer: {
    modal: modalReducer, //modal är namnet som användes i useSelector för att komma åt state => state.modal
    quiz: quizReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
});

//icon animation hover
//https://ianlunn.github.io/Hover/
