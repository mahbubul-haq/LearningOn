/* eslint-disable no-undef */

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "..";
import { store } from "../../../main";
import { GlobalState } from "../../../state/GlobalContext";
import { HomePageState } from "../../../state/HomePageState";
import { NotificationState } from "../../../state/NotificationContext";

test("homepage renders properly", () => {
  //expect(1 + 2).toBe(3);
  render(
    <Provider store={store}>
      <NotificationState>
        <HomePageState>
          <GlobalState>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<HomePage />}
                />
              </Routes>
            </BrowserRouter>
          </GlobalState>
        </HomePageState>
      </NotificationState>
    </Provider>
  );
  const textElement = screen.getByText("LearningOn");
  expect(textElement).toBeInTheDocument();
});
