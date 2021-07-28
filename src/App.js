import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import Search from "./components/Search";
import Results from "./components/Results";
import User from "./components/User";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {/* Public Routes */}
          <Route exact path="/search" component={Search} />
          <Route exact path="/results" component={Results} />
          <Route exact path="/user" component={User} />
          {/* Catch all other routes and redirect to main page */}
          <Route
            exact
            path="*"
            component={() => {
              return <Redirect to="search" />;
            }}
          />{" "}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
