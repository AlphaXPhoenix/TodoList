// __tests__/SignIn.test.js
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SignIn from '../SignIn';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const navigation = {navigate: jest.fn()};

describe('SignIn Screen', () => {
  it('renders inputs and sign-in button', () => {
    const store = mockStore({
      user: {
        users: [],
      },
    });

    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <SignIn navigation={navigation} />
      </Provider>,
    );

    expect(getByPlaceholderText('Alex@yahoo.com')).toBeTruthy();
    expect(getByPlaceholderText('*************')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('accepts email input', () => {
    const store = mockStore({
      user: {
        users: [],
      },
    });

    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <SignIn navigation={navigation} />
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Alex@yahoo.com');
    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
  });
});
