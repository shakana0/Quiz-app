import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/Modal/AuthSlice"
import modalReducer from "../features/Modal/ModalSlice";
import quizReducer from "../features/singleQuiz/QuizSlice";
import thunk from 'redux-thunk';


// const rootReducer = combineReducers({
//   modal: modalReducer,
//   quiz: quizReducer,
//   auth: authReducer
// });

const rootReducer = combineReducers({
  modal: modalReducer,
  quiz: quizReducer,
  auth: authReducer
});

// const rootReducer = (state:  ReturnType<typeof appReducer>, action: any) => {
//   if (action.type === 'LOG_OUT') {
//     storage.removeItem('persist:root')
//     return appReducer(undefined, action)
//   }

//   return appReducer(state, action)
// }

const persistConfig = {
  key: "persist-key",
  storage,
  // whiteList: ['activeUser']
};

 const persistedReducer = persistReducer(persistConfig, rootReducer);

 export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

// export const persistedStore = persistStore(store)
export const persistor = persistStore(store)


// export default configureStore({
//   reducer: {
//     modal: modalReducer, //modal är namnet som användes i useSelector för att komma åt state => state.modal
//     quiz: quizReducer,
//   },
// });


