import "./App.scss";
import { Main, Login, Post, User } from "./pages/";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/post" exact>
            <Post />
          </Route>
          <Route path="/user" exact>
            <User />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
