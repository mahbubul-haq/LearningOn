import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../../test-utils';
import RecentEnrollments from '../../components/RecentEnrollments';

describe('RecentEnrollments', () => {
    const mockTheme = {
        palette: {
            text: { primary: '#000', secondary: '#666' },
            primary: { lighter: '#9178e6' },
            mode: 'light',
        },
    };

    const mockEnrollments = [
        {
            userId: '1',
            userName: 'John Doe',
            userImage: 'https://example.com/john.jpg',
            courseTitle: 'React Basics',
            paidAmount: 595,
            enrolledOn: '2024-01-15',
        },
        {
            userId: '2',
            userName: 'Jane Smith',
            userImage: 'https://example.com/jane.jpg',
            courseTitle: 'Advanced JavaScript',
            paidAmount: 795,
            enrolledOn: '2024-01-14',
        },
        {
            userId: '3',
            userName: 'Bob Johnson',
            courseTitle: 'Node.js Mastery',
            paidAmount: 895,
            enrolledOn: '2024-01-13',
        },
        {
            userId: '4',
            userName: 'Alice Williams',
            courseTitle: 'TypeScript Pro',
            paidAmount: 695,
            enrolledOn: '2024-01-12',
        },
    ];

    const defaultProps = {
        recentEnrollments: mockEnrollments,
        glassSx: { background: 'rgba(255, 255, 255, 0.7)' },
        theme: mockTheme,
    };

    it('should render Recent Enrollments title', () => {
        render(<RecentEnrollments {...defaultProps} />);

        expect(screen.getByText('Recent Enrollments')).toBeInTheDocument();
    });

    it('should render View All button', () => {
        render(<RecentEnrollments {...defaultProps} />);

        expect(screen.getByText('View All')).toBeInTheDocument();
    });

    it('should display student names', () => {
        render(<RecentEnrollments {...defaultProps} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('should display course titles', () => {
        render(<RecentEnrollments {...defaultProps} />);

        expect(screen.getByText(/React Basics/)).toBeInTheDocument();
        expect(screen.getByText(/Advanced JavaScript/)).toBeInTheDocument();
    });

    it('should display payment amounts', () => {
        render(<RecentEnrollments {...defaultProps} />);

        expect(screen.getByText('$595')).toBeInTheDocument();
        expect(screen.getByText('$795')).toBeInTheDocument();
    });

    it('should limit to 3 enrollments', () => {
        render(<RecentEnrollments {...defaultProps} />);

        // Should show first 3
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument();

        // Should not show 4th
        expect(screen.queryByText('Alice Williams')).not.toBeInTheDocument();
    });

    it('should show "No enrollments yet" when empty', () => {
        render(<RecentEnrollments {...defaultProps} recentEnrollments={[]} />);

        expect(screen.getByText('No enrollments yet.')).toBeInTheDocument();
    });

    it('should render student avatars', () => {
        const { container } = render(<RecentEnrollments {...defaultProps} />);

        const avatars = container.querySelectorAll('.MuiAvatar-root');
        expect(avatars.length).toBe(3); // Only 3 shown
    });

    it('should use placeholder avatar when userImage is missing', () => {
        render(<RecentEnrollments {...defaultProps} />);

        // Bob Johnson doesn't have userImage, should use pravatar
        const avatars = screen.getAllByRole('img');
        const bobAvatar = avatars.find(img => img.src.includes('pravatar'));
        expect(bobAvatar).toBeDefined();
    });

    it('should format enrollment dates', () => {
        render(<RecentEnrollments {...defaultProps} />);

        // Dates should be formatted (exact format depends on locale)
        const dateElements = screen.getAllByText(/\d{1,2}\/\d{1,2}\/\d{4}/);
        expect(dateElements.length).toBeGreaterThan(0);
    });
});
