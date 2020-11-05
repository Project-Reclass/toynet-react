import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router-dom';

import Values from 'src/ModuleList/Values/Values';


const RenderWithRouter = ({ children, valuesId }) => (
  <MemoryRouter initialEntries={[`/values/${valuesId}`]}>
    <Route path="/values/:valuesId">{children}</Route>
  </MemoryRouter>
);

describe('The values page', () => {
  it('should render the same based on URL parameters for integrity', () => {
    const tree = renderer.create(
      <RenderWithRouter valuesId={5001}>
        <Values />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('The values page', () => {
  it('should render the same based on URL parameters for respect', () => {
    const tree = renderer.create(
      <RenderWithRouter valuesId={5002}>
        <Values />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('The values page', () => {
  it('should render the same based on URL parameters for honor', () => {
    const tree = renderer.create(
      <RenderWithRouter valuesId={5003}>
        <Values />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('The values page', () => {
  it('should render the same based on URL parameters for loyalty', () => {
    const tree = renderer.create(
      <RenderWithRouter valuesId={5004}>
        <Values />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});