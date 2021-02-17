import "./App.scss";
import { Main } from "./pages/main/Main";
import { Login } from "./pages/login/Login";
import { Post } from "./pages/post/Post";
import { User } from "./pages/user/User";
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
