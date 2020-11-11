import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router-dom';

import Value from 'src/ModuleList/Value';


const RenderWithRouter = ({ children, valueId }) => (
  <MemoryRouter initialEntries={[`/value/${valueId}`]}>
    <Route path="/value/:valueId">{children}</Route>
  </MemoryRouter>
);

describe('The value page', () => {
  it('should render the same based on URL parameters for integrity', () => {
    const tree = renderer.create(
      <RenderWithRouter valueId={5001}>
        <Value />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the same based on URL parameters for respect', () => {
    const tree = renderer.create(
      <RenderWithRouter valueId={5002}>
        <Value />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the same based on URL parameters for honor', () => {
    const tree = renderer.create(
      <RenderWithRouter valueId={5003}>
        <Value />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the same based on URL parameters for loyalty', () => {
    const tree = renderer.create(
      <RenderWithRouter valueId={5004}>
        <Value />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});