import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../../test-utils';
import StatCard from '../../components/StatCard';
import { AttachMoney } from '@mui/icons-material';

describe('StatCard', () => {
    const defaultProps = {
        title: 'Revenue',
        value: '$1,234',
        color: '#00C853',
        icon: <AttachMoney />,
        glassSx: { background: 'rgba(255, 255, 255, 0.7)' },
    };

    it('should render title and value', () => {
        render(<StatCard {...defaultProps} />);

        expect(screen.getByText('Revenue')).toBeInTheDocument();
        expect(screen.getByText('$1,234')).toBeInTheDocument();
    });

    it('should render icon', () => {
        render(<StatCard {...defaultProps} />);

        const icon = screen.getByTestId('AttachMoneyIcon');
        expect(icon).toBeInTheDocument();
    });

    it('should apply color to icon container', () => {
        const { container } = render(<StatCard {...defaultProps} />);

        const iconContainer = container.querySelector('[class*="MuiBox"]');
        expect(iconContainer).toHaveStyle({ color: '#00C853' });
    });

    it('should display title in uppercase', () => {
        render(<StatCard {...defaultProps} />);

        const title = screen.getByText('Revenue');
        expect(title).toHaveStyle({ textTransform: 'uppercase' });
    });

    it('should render with different values', () => {
        render(<StatCard {...defaultProps} title="Students" value="42" />);

        expect(screen.getByText('Students')).toBeInTheDocument();
        expect(screen.getByText('42')).toBeInTheDocument();
    });
});
