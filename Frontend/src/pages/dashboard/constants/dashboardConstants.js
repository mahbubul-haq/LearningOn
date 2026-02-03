// --- VISUAL CONSTANTS ---
export const STATUS_THEMES = {
    published: { label: 'Published', color: '#01963fff', bg: 'rgba(0, 200, 83, 0.1)' },
    draft: { label: 'Draft', color: '#757575', bg: 'rgba(117, 117, 117, 0.1)' },
    waiting: { label: 'Waiting', color: '#c98600ff', bg: 'rgba(255, 171, 0, 0.1)' }, // Unpublished maps here
};

// --- MOCK DATA GENERATOR ---
export const generateChartData = (minYear, maxYear) => {
    const data = [];
    // Ensure years are numbers
    const startYear = parseInt(minYear);
    const endYear = parseInt(maxYear);

    const start = new Date(startYear, 0, 1);
    // User selected "to" year, usually implies inclusive of that year
    const end = new Date(endYear, 11, 31);

    const totalMonths = (endYear - startYear + 1) * 12;

    // Determine step to keep points between ~6 and ~15
    // If 1 year (12 months) -> step 1 -> 12 points (Perfect)
    // If 2 years (24 months) -> step 2 -> 12 points (Perfect)
    // If 3 years (36 months) -> step 3 -> 12 points (Perfect)
    // If 5 years (60 months) -> step 5 -> 12 points
    let stepMonths = Math.max(1, Math.floor(totalMonths / 12));

    let current = new Date(start);
    while (current <= end) {
        // Format: "Jan 23"
        const label = current.toLocaleString('default', { month: 'short', year: '2-digit' });

        data.push({
            name: label,
            revenue: Math.floor(Math.random() * 5000) + 1000,
            enrollments: Math.floor(Math.random() * 50) + 5,
        });

        current.setMonth(current.getMonth() + stepMonths);
    }
    return data;
};

// Helper to map course status
export const getStatusKey = (status) => {
    const s = status?.toLowerCase();
    if (s === 'published') return 'published';
    if (s === 'unpublished') return 'waiting';
    if (s === 'draft') return 'draft';
    return 'draft';
};
