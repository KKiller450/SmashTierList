import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import About from "./About";
import TableComp from "./TableComp";
import "../../css/app.css";

function Main() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/table" component={TableComp} />
                </Switch>
            </div>
        </Router>
    );
}

const Home = () => (
    <div>
        <h1 className="home">Welcome to the Smash Players Application Demo</h1>
        <h2 className="home">Presented by Kevin Kite</h2>
        <Link to="/table">
            <button className="btn btn-success">Continue</button>
        </Link>
    </div>
);

export default Main;

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
