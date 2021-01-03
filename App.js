import React, {Component} from 'react';
import {DataProvider} from './assets/config/DataProvider';
import MainApp from './assets/screens/MainApp';

class App extends Component {
  render() {
    return (
      <DataProvider>
        <MainApp />
      </DataProvider>
    );
  }
}

export default App;
