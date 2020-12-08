import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import InnerBrowser from './containers/InnerBrowser/InnerBrowser';
import Frame from './hoc/Frame/Frame';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
    render() {
        //const {path} = this.props.match;
        return (
            <div>
                <Frame>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/innerbrowser" component={InnerBrowser} />
                    {/*<Redirect to="/" />*/}
                </Frame>   
            </div>
        );
    }
}

export default App;