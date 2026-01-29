import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { DisneyApp } from "./DisneyApp";
import { describe, test, expect, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";

// Create hoisted mocks
const mockDispatch = vi.fn(); // This will be the dispatch function
const mockUseAppDispatch = vi.hoisted(() => vi.fn(() => mockDispatch)); // This returns mockDispatch
const mockUseAppSelector = vi.hoisted(() => vi.fn());
// Mock dependencies
vi.mock("./components/custom/CustomJumbotron", () => ({
  CustomJumbotron: () => <div data-testid="custom-jumbotron" />,
}));

vi.mock("./components/custom/CustomCharacterTable", () => ({
  CustomCharacterTable: () => <div data-testid="custom-character-table" />,
}));

vi.mock("./components/custom/CustomCharacterModal", () => ({
  CustomCharacterModal: () => <div data-testid="custom-character-modal" />,
}));

vi.mock("./components/custom/CustomsStatsRibbon", () => ({
  CustomStatsRibbon: () => <div data-testid="custom-stats-ribbon" />,
}));

vi.mock("./components/custom/CustomFilterForm", () => ({
  CustomFilterForm: () => <div data-testid="custom-filter-form" />,
}));

vi.mock("./components/custom/CustomFilmsPieChart", () => ({
  CustomFilmsPieChart: () => <div data-testid="custom-films-pie-chart" />,
}));

vi.mock("./store/disneySlice", () => ({
  fetchAllCharacters: vi.fn(),
}));

vi.mock("./store/hooks", () => ({
  useAppDispatch: () => mockUseAppDispatch(),
  useAppSelector: mockUseAppSelector,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("DisneyApp", () => {
  test("renders main components", () => {
    // Create a valid store with a reducer
    const store = configureStore({
      reducer: {
        disney: () => ({}), // Minimal reducer
      },
    });

    mockUseAppSelector.mockReturnValue({ error: null });

    render(
      <Provider store={store}>
        <DisneyApp />
      </Provider>,
    );

    expect(screen.getByTestId("custom-jumbotron")).toBeInTheDocument();
  });

  test("shows error message", () => {
    const store = configureStore({
      reducer: {
        disney: () => ({}),
      },
    });

    mockUseAppSelector.mockReturnValue({ error: "Failed to load" });

    render(
      <Provider store={store}>
        <DisneyApp />
      </Provider>,
    );

    expect(screen.getByText("Error: Failed to load")).toBeInTheDocument();
  });
});
