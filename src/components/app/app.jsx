import styles from './app.module.css';
import { BrowserRouter as Router } from 'react-router-dom';

import ModalSwitch from '../modal-switch';
import Header from '../app-header/app-header';

const App = () => (
  <Router>
    <Header />
    <ModalSwitch />
  </Router>
);

export default App;
