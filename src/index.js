import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';

import {persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { GlobalProvider } from './contexts/GlobalContexts';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'
if(process.env.NODE_ENV === 'production') disableReactDevTools();

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
