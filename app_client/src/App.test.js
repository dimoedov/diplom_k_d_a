import React from 'react';
import {render, Simulate, wait} from '@testing-library/react'
// import {extend-expect} from 'react-testing-library';
import ReactTestUtils from 'react-dom/test-utils';
import Auth from "./components/Auth/Auth";
import {BrowserRouter} from "react-router-dom";
import axiosMock from 'axios'
test('displays greeting when clicking Load Greeting', async () => {
    const {
        getByLabelText,
        getByText,
        getByTestId,
        getByName,
        container
    } = render(<BrowserRouter>
                   <Auth/>
              </BrowserRouter>);
    getByTestId('username').value = 'dimoedov';
    getByTestId('password').value = '1Qweasdzxc_';
    ReactTestUtils.Simulate.click(getByText('Отправить'));
    await wait(() => getByTestId('greeting-text'));
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
// test('вход', () => {
//   const { getByText } = render(
//       <BrowserRouter>
//           <Auth/>
//       </BrowserRouter>);
//   const linkElement = get(/Войти/i);
//   expect(linkElement).toBeCalled;

});
