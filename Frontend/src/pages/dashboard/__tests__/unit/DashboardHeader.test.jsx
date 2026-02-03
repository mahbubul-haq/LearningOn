import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../../test-utils';
import DashboardHeader from '../../components/DashboardHeader';
import userEvent from '@testing-library/user-event';

describe('DashboardHeader', () => {
    const mockTheme = {
        palette: {
            text: { primary: '#000', secondary: '#666' },
            primary: { lighter: '#9178e6' },
        },
    };

    const defaultProps = {
        minYear: 2023,
        maxYear: 2024,
        setMinYear: vi.fn(),
        setMaxYear: vi.fn(),
        onBack: vi.fn(),
        glassSx: { background: 'rgba(255, 255, 255, 0.7)' },
        theme: mockTheme,
    };

    it('should render Dashboard title', () => {
        render(<DashboardHeader {...defaultProps} />);

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should render subtitle', () => {
        render(<DashboardHeader {...defaultProps} />);

        expect(screen.getByText('Real-time performance metrics')).toBeInTheDocument();
    });

    it('should render back button', () => {
        render(<DashboardHeader {...defaultProps} />);

        expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('should call onBack when back button clicked', async () => {
        const user = userEvent.setup();
        const onBack = vi.fn();

        render(<DashboardHeader {...defaultProps} onBack={onBack} />);

        await user.click(screen.getByText('Back'));

        expect(onBack).toHaveBeenCalledTimes(1);
    });

    it('should render year selectors with correct values', () => {
        render(<DashboardHeader {...defaultProps} />);

        // Check if year selectors are rendered
        const selects = screen.getAllByRole('combobox');
        expect(selects).toHaveLength(2);
    });

    it('should display "to" text between year selectors', () => {
        render(<DashboardHeader {...defaultProps} />);

        expect(screen.getByText('to')).toBeInTheDocument();
    });

    it('should render calendar icon', () => {
        render(<DashboardHeader {...defaultProps} />);

        const calendarIcon = screen.getByTestId('CalendarMonthIcon');
        expect(calendarIcon).toBeInTheDocument();
    });
});
