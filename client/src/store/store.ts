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
import thunk from "redux-thunk";

// const rootReducer = combineReducers({
//   modal: modalReducer,
//   quiz: quizReducer,
//   auth: authReducer
// });

// type RootState = ReturnType<typeof rootReducer>;

// export const logOut = () => {
//   type: 'RESET'
// }

const appReducer = combineReducers({
  modal: modalReducer,
  quiz: quizReducer,
  auth: authReducer,
});

// export const rootReducer: Reducer = (
//   state: ReturnType<typeof appReducer>,
//   action: AnyAction
// ) => {
//   console.log(action.type);
//   if (action.type === "RESET_APP") {
//     storage.removeItem("persist:root");
//     // persistor.pause();
//     // persistor.flush().then(() => {
//     //   return persistor.purge();
//     // });
//     console.log("helo from root reducer");
//     // state = {} as RootState;
//     state = {} as RootState;
//   }
//   return appReducer(state, action);
// };

const persistConfig = {
  key: "persist-key",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
// persistor.pause();
// persistor.flush().then(() => {
//   return persistor.purge();
// });

// export default rootReducer;

// export default configureStore({
//   reducer: {
//     modal: modalReducer, //modal är namnet som användes i useSelector för att komma åt state => state.modal
//     quiz: quizReducer,
//   },
// });
