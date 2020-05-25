import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect, Router } from 'react-router-dom';

import InnerBrowser from './container/InnerBrowser/InnerBrowser';
import Frame from './hoc/Frame/Frame';
import Dashboard from './container/Dashboard/Dashboard';
import Article from './container/Article/Article';

class App extends Component {
    render() {
        const {path} = this.props.match;
        console.log('app: ');
        console.log(this.props);
        return (
            <div>
                <Frame>
                    <Switch>
                        <Route path="/innerbrowser/easynhknews/articles/:id" component={Article}/>
                        <Route path="/innerbrowser/easynhknews" component={InnerBrowser} />
                        <Route path="/" exact component={Dashboard} />
                        {/*<Redirect to="/" />*/}
                    </Switch>
                </Frame>
            </div>
        );
    }
}

export default withRouter(App);