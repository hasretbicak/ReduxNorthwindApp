import {applyMiddleware, createStore} from "redux"
import rootReducer from "./index"
import { thunk } from "redux-thunk"

// Bir store vasıtası ile uygulamada bir store oluşturmak istediimizi onunda rootReducer içerdiğini belirtiyoruz.
export default function configureStore(){
    return createStore(rootReducer, applyMiddleware(thunk))
}

 