// import logo from "./logo.svg";
import "./App.css";
import Page1 from "./Page/Page1";
import Page2 from "./Page/Page2";
import Page3 from "./Page/Page3";
import Comment from "./Page/Comment";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Routes,
  // Link,
  Redirect,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Propertylisting" component={Page2} />
        <Route path="/Propertycategory" component={Page1} />
        <Route path="/Propertydetails" component={Page3} />
        <Route path="/property-thank-you-page" component={Comment} />

        <Route path="/" component={Page1} />
        {/* <Redirect from="/" to="/Page1" /> */}

        {/* <Route path="/Comment" component={Comment} /> */}
      </Switch>
    </Router>
  );
}

export default App;
