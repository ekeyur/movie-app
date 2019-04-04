import React from 'react';
import { shallow } from 'enzyme';
import App from './';

it('renders a dashboard', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toMatchSnapshot();
})