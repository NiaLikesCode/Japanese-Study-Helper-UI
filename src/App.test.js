import React from 'react';
import { shallow } from 'enzyme';

import App from './App'
import Frame from './hoc/Frame/Frame';
import { Route } from 'react-router-dom';

describe('<App />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('should render <Frame />', () => {
        expect(wrapper.find(Frame)).toHaveLength(1);
    });

    it('should render 2 <Route />', () => {
        expect(wrapper.find(Route)).toHaveLength(2);
    });
});
