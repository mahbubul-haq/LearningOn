import { describe, it, expect } from 'vitest';
import { STATUS_THEMES, generateChartData, getStatusKey } from '../../constants/dashboardConstants';

describe('dashboardConstants', () => {
    describe('STATUS_THEMES', () => {
        it('should have approved theme', () => {
            expect(STATUS_THEMES.approved).toEqual({
                label: 'Approved',
                color: '#00C853',
                bg: 'rgba(0, 200, 83, 0.1)',
            });
        });

        it('should have draft theme', () => {
            expect(STATUS_THEMES.draft).toEqual({
                label: 'Draft',
                color: '#757575',
                bg: 'rgba(117, 117, 117, 0.1)',
            });
        });

        it('should have waiting theme', () => {
            expect(STATUS_THEMES.waiting).toEqual({
                label: 'Waiting',
                color: '#FFAB00',
                bg: 'rgba(255, 171, 0, 0.1)',
            });
        });
    });

    describe('generateChartData', () => {
        it('should generate data for single year', () => {
            const data = generateChartData(2024, 2024);

            expect(data).toBeInstanceOf(Array);
            expect(data.length).toBeGreaterThan(0);
            expect(data[0]).toHaveProperty('name');
            expect(data[0]).toHaveProperty('revenue');
            expect(data[0]).toHaveProperty('enrollments');
        });

        it('should generate data for year range', () => {
            const data = generateChartData(2023, 2024);

            expect(data).toBeInstanceOf(Array);
            expect(data.length).toBeGreaterThan(0);
        });

        it('should create correct data structure', () => {
            const data = generateChartData(2024, 2024);

            data.forEach(item => {
                expect(item).toHaveProperty('name');
                expect(item).toHaveProperty('revenue');
                expect(item).toHaveProperty('enrollments');
                expect(typeof item.name).toBe('string');
                expect(typeof item.revenue).toBe('number');
                expect(typeof item.enrollments).toBe('number');
            });
        });

        it('should generate revenue values in expected range', () => {
            const data = generateChartData(2024, 2024);

            data.forEach(item => {
                expect(item.revenue).toBeGreaterThanOrEqual(1000);
                expect(item.revenue).toBeLessThanOrEqual(6000);
            });
        });

        it('should generate enrollment values in expected range', () => {
            const data = generateChartData(2024, 2024);

            data.forEach(item => {
                expect(item.enrollments).toBeGreaterThanOrEqual(5);
                expect(item.enrollments).toBeLessThanOrEqual(55);
            });
        });
    });

    describe('getStatusKey', () => {
        it('should map published to published', () => {
            expect(getStatusKey('published')).toBe('published');
            expect(getStatusKey('Published')).toBe('published');
            expect(getStatusKey('PUBLISHED')).toBe('published');
        });

        it('should map unpublished to waiting', () => {
            expect(getStatusKey('unpublished')).toBe('waiting');
            expect(getStatusKey('Unpublished')).toBe('waiting');
        });

        it('should map draft to draft', () => {
            expect(getStatusKey('draft')).toBe('draft');
            expect(getStatusKey('Draft')).toBe('draft');
        });

        it('should default to draft for unknown status', () => {
            expect(getStatusKey('unknown')).toBe('draft');
            expect(getStatusKey('random')).toBe('draft');
        });

        it('should handle null and undefined', () => {
            expect(getStatusKey(null)).toBe('draft');
            expect(getStatusKey(undefined)).toBe('draft');
        });

        it('should return existing status key if in STATUS_THEMES', () => {
            expect(getStatusKey('approved')).toBe('approved');
            expect(getStatusKey('waiting')).toBe('waiting');
        });
    });
});
