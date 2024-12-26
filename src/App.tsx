import { useState } from 'react';

import style from './styles/global-style.module.scss';

import MainArea from './components/MainArea/MainArea.tsx';
import Header from './components/Header/Header.tsx';

function App() {
  return (
    <div className='app__container container'>
      <Header/>
      <MainArea/>
    </div>
  );
}

export default App;

