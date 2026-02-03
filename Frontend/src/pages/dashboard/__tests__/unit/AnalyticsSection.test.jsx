import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../../test-utils';
import AnalyticsSection from '../../components/AnalyticsSection';

describe('AnalyticsSection', () => {
  const mockTheme = {
    palette: {
      text: { primary: '#000', secondary: '#666' },
      primary: { lighter: '#9178e6' },
      mode: 'light',
    },
  };

  const mockChartData = [
    { name: 'Jan 24', revenue: 2500, enrollments: 25 },
    { name: 'Feb 24', revenue: 3000, enrollments: 30 },
  ];

  const mockEnrollments = [
    {
      userId: '1',
      userName: 'John Doe',
      courseTitle: 'React Basics',
      paidAmount: 595,
      enrolledOn: '2024-01-15',
    },
  ];

  const defaultProps = {
    selectedCourse: null,
    totalRevenue: 5500,
    totalStudents: 55,
    chartData: mockChartData,
    recentEnrollments: mockEnrollments,
    glassSx: { background: 'rgba(255, 255, 255, 0.7)' },
    theme: mockTheme,
  };

  it('should render all three stat cards', () => {
    render(<AnalyticsSection {...defaultProps} />);
    
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Total Students')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('should display correct revenue value', () => {
    render(<AnalyticsSection {...defaultProps} />);
    
    expect(screen.getByText('$5,500')).toBeInTheDocument();
  });

  it('should display correct student count', () => {
    render(<AnalyticsSection {...defaultProps} />);
    
    expect(screen.getByText('55')).toBeInTheDocument();
  });

  it('should display default rating when no course selected', () => {
    render(<AnalyticsSection {...defaultProps} />);
    
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('should display course rating when course selected', () => {
    const selectedCourse = {
      courseTitle: 'React Basics',
      ratings: { totalRating: '4.5' },
    };
    
    render(<AnalyticsSection {...defaultProps} selectedCourse={selectedCourse} />);
    
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should not render CourseActionBar when no course selected', () => {
    render(<AnalyticsSection {...defaultProps} />);
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Go to Course')).not.toBeInTheDocument();
  });

  it('should render CourseActionBar when course selected', () => {
    const selectedCourse = {
      courseTitle: 'React Basics',
    };
    
    render(<AnalyticsSection {...defaultProps} selectedCourse={selectedCourse} />);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Go to Course')).toBeInTheDocument();
  });

  it('should render TrendsCharts component', () => {
    render(<AnalyticsSection {...defaultProps} />);
    
    expect(screen.getByText('Revenue Trends')).toBeInTheDocument();
    expect(screen.getByText('Enrollment Trends')).toBeInTheDocument();
  });

  it('should render RecentEnrollments component', () => {
    render(<AnalyticsSection {...defaultProps} />);
    
    expect(screen.getByText('Recent Enrollments')).toBeInTheDocument();
  });

  it('should format large revenue numbers with commas', () => {
    render(<AnalyticsSection {...defaultProps} totalRevenue={1234567} />);
    
    expect(screen.getByText('$1,234,567')).toBeInTheDocument();
  });
});
