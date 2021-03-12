import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import BlogDetails from "./BlogDetails";
import Create from "./Create";
import Home from "./Home";
import Navbar from "./Navbar";

function App() {
  return (
      <Router>
          <div className="App">
            <Navbar/>
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route exact path="/blogs/:id">
                  <BlogDetails/>
                </Route>
                <Route exact path="/create">
                  <Create/>
                </Route>
              </Switch>
            </div>

          </div>
      </Router>

  );
}

export default App;
