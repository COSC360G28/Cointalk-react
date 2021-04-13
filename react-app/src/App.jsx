import "./App.scss";
import { createContext, useState } from "react";
import { Main, Login, Post, User, SignUp, Logout } from "./pages/";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "./Contexts.js";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={[user, setUser]}>
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
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
