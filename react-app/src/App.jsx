import "./App.scss";
import { Main, Login, Post, User, SignUp, Logout } from "./pages/";
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
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/post/:id" exact>
            <Post />
          </Route>
          <Route path="/user" exact>
            <User />
          </Route>
          <Route path="/logout" exact>
            <Logout />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
