import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MyTasks from './pages/MyTasks';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/tasks" component={ MyTasks } />
        <Route path="/tasks/create" component={ CreateTask } />
        <Route path="/tasks/edit/:id" component={ EditTask } />
      </Switch>
    </div>
  );
}

export default App;
