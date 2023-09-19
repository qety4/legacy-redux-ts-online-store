import { compose, createStore, applyMiddleware,Middleware } from 'redux'
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import { rootReducer } from './root-reducer'
import { persistStore, persistReducer,PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'
import { loggerMiddleware } from './middleware/logger'

// root reducer

export type RootState = ReturnType<typeof rootReducer>

declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?:typeof compose
    }
}

type PersistConfigE= PersistConfig<RootState> &{
    whitelist:(keyof RootState)[]
}

const persistConfig:PersistConfigE = {
    key: 'root',
    storage,
    whitelist: ['cart']
}


// const thunkMiddleware = (store) =>(next)=>(action)=>{
//     if(typeof(action) === 'function'){
//         action(dispatch)
//     }
// }

const sagaMiddleware = createSagaMiddleware();


const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV !== 'production' && loggerMiddleware,
    sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware))

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers);

    sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)