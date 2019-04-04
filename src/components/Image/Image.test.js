import React from 'react';
import { shallow } from 'enzyme';
import Image from './';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Image/>);
})

it('Matches the snapshot', () => {
  const wrapper = shallow(<Image />)
  expect(wrapper).toMatchSnapshot();
})