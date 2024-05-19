import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DrawingApp from './pages/DrawingApp';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/drawing" component={DrawingApp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;