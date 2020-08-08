import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Player from '../lib/index';

let component: RenderResult;

describe('First Sample Test Suite:', () => {
  beforeEach(() => {
    component = render(<Player />);
  })

  it('Runs the first test', (done) => {
    expect(true).toBe(true);
    done();
  })

  it('Renders React Component', (done) => {
    component.getByText(/Hello/);
    done();
  })
})
