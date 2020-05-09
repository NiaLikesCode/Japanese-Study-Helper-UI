import React, { Component } from 'react';
//import { Link, Route } from 'react-router-dom';

import Wrapper from './hoc/Wrapper/Wrapper';
import InnerBrowser from './container/InnerBrowser/InnerBrowser';

class App extends Component {
    render() {
        return (
            <Wrapper>
                <InnerBrowser />
                {/*<Route path="/" exact component={} />*/}
                {/*<Route path="/pizza" exact component={} />*/}
            </Wrapper>
        );
    }
}

export default App;