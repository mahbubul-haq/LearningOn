import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import { DashboardContext } from './src/state/DashboardContext';

// Create a mock theme
const mockTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#9178e6',
            lighter: '#9178e6',
        },
        text: {
            primary: '#000000',
            secondary: '#666666',
        },
        divider: '#e0e0e0',
        background: {
            paper: '#ffffff',
        },
        glassCard: {
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
        },
    },
});

// Create a mock Redux store
const createMockStore = (initialState = {}) => {
    return configureStore({
        reducer: {
            auth: (state = { user: { _id: '123', name: 'Test User' }, token: 'test-token' }) => state,
        },
        preloadedState: initialState,
    });
};

// Create mock Dashboard context
const createMockDashboardContext = (overrides = {}) => ({
    myCourses: [],
    setMyCourses: vi.fn(),
    selectedCourse: null,
    setSelectedCourse: vi.fn(),
    recentEnrollments: [],
    setRecentEnrollments: vi.fn(),
    getMyCourses: vi.fn(),
    openedTab: 'Courses',
    setOpenedTab: vi.fn(),
    ...overrides,
});

// Custom render function with all providers
function customRender(
    ui,
    {
        initialState = {},
        store = createMockStore(initialState),
        dashboardContext = createMockDashboardContext(),
        theme = mockTheme,
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <DashboardContext.Provider value={dashboardContext}>
                            {children}
                        </DashboardContext.Provider>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }

    return {
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
        store,
        dashboardContext,
    };
}

// Re-export everything
export * from '@testing-library/react';
export { customRender as render, createMockStore, createMockDashboardContext, mockTheme };
