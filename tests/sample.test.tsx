import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Player from '../lib/index';

let component: RenderResult;

describe('First Sample Test Suite:', () => {
  it('Runs the first test', (done) => {
    expect(true).toBe(true);
    done();
  })

  it('Renders React Component', (done) => {
    component = render(<Player />);
    component.getByText(/Hello/);
    done();
  })
})
