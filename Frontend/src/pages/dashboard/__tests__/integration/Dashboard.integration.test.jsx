import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../../../../test-utils';
import { createMockDashboardContext } from '../../../../../test-utils';
import Dashboard from '../../index';
import userEvent from '@testing-library/user-event';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Dashboard Integration Tests', () => {
    const mockCourses = [
        {
            _id: '1',
            courseTitle: 'React Basics',
            courseStatus: 'published',
            instructorName: 'Test User',
            enrolledStudents: [
                {
                    userId: '101',
                    userName: 'Student 1',
                    paidAmount: 595,
                    enrolledOn: '2024-01-15',
                },
            ],
            ratings: { totalRating: '4.5' },
        },
        {
            _id: '2',
            courseTitle: 'Advanced JavaScript',
            courseStatus: 'draft',
            instructorName: 'Another Instructor',
            enrolledStudents: [
                {
                    userId: '102',
                    userName: 'Student 2',
                    paidAmount: 795,
                    enrolledOn: '2024-01-14',
                },
            ],
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render complete dashboard with all sections', () => {
        const dashboardContext = createMockDashboardContext({
            myCourses: mockCourses,
        });

        render(<Dashboard />, { dashboardContext });

        // Header
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeInTheDocument();

        // Course selector (desktop or mobile)
        expect(screen.getByText('My Courses') || screen.getByText('Currently Viewing')).toBeTruthy();

        // Analytics
        expect(screen.getByText('Revenue')).toBeInTheDocument();
        expect(screen.getByText('Total Students')).toBeInTheDocument();
        expect(screen.getByText('Rating')).toBeInTheDocument();
    });

    it('should update analytics when course is selected', async () => {
        const user = userEvent.setup();
        const dashboardContext = createMockDashboardContext({
            myCourses: mockCourses,
        });

        render(<Dashboard />, { dashboardContext });

        // Initially shows global stats
        await waitFor(() => {
            expect(screen.getByText('$1,390')).toBeInTheDocument(); // Total revenue from both courses
        });

        // Select a course
        const courseButton = screen.getByText('React Basics');
        await user.click(courseButton);

        // Should update to show course-specific stats
        await waitFor(() => {
            expect(screen.getByText('$595')).toBeInTheDocument(); // Revenue from selected course only
        });
    });

    it('should navigate back when back button clicked', async () => {
        const user = userEvent.setup();
        const dashboardContext = createMockDashboardContext({
            myCourses: mockCourses,
        });

        render(<Dashboard />, { dashboardContext });

        const backButton = screen.getByText('Back');
        await user.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('should fetch courses on mount', () => {
        const getMyCourses = vi.fn();
        const dashboardContext = createMockDashboardContext({
            getMyCourses,
        });

        render(<Dashboard />, { dashboardContext });

        expect(getMyCourses).toHaveBeenCalled();
    });

    it('should display course action bar when course selected', async () => {
        const user = userEvent.setup();
        const dashboardContext = createMockDashboardContext({
            myCourses: mockCourses,
        });

        render(<Dashboard />, { dashboardContext });

        // Initially no action bar
        expect(screen.queryByText('Edit')).not.toBeInTheDocument();

        // Select a course
        const courseButton = screen.getByText('React Basics');
        await user.click(courseButton);

        // Action bar should appear
        await waitFor(() => {
            expect(screen.getByText('Edit')).toBeInTheDocument();
            expect(screen.getByText('Go to Course')).toBeInTheDocument();
        });
    });

    it('should calculate total revenue correctly', () => {
        const dashboardContext = createMockDashboardContext({
            myCourses: mockCourses,
        });

        render(<Dashboard />, { dashboardContext });

        // Total revenue: 595 + 795 = 1390
        expect(screen.getByText('$1,390')).toBeInTheDocument();
    });

    it('should calculate total students correctly', () => {
        const dashboardContext = createMockDashboardContext({
            myCourses: mockCourses,
        });

        render(<Dashboard />, { dashboardContext });

        // Total students: 2
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should show recent enrollments', () => {
        const dashboardContext = createMockDashboardContext({
            myCourses: mockCourses,
        });

        render(<Dashboard />, { dashboardContext });

        expect(screen.getByText('Recent Enrollments')).toBeInTheDocument();
        expect(screen.getByText('Student 1')).toBeInTheDocument();
        expect(screen.getByText('Student 2')).toBeInTheDocument();
    });
});
