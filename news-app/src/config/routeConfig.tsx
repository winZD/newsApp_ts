import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "../layout/homePage";
import ArticlePage from "../layout/articlePage";
import CategoryPage from "../layout/categoryPage";

const Routing = () => {
  const history = createBrowserHistory();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/article/:id" component={ArticlePage}></Route>
        <Route path="/category/:id" component={CategoryPage}></Route>
      </Switch>
    </Router>
  );
};
export default Routing;
