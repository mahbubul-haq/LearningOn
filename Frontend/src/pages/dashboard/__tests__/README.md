# Dashboard Testing Suite

Comprehensive test coverage for the modularized Dashboard component.

## 📊 Test Coverage

### Unit Tests (7 files)
- ✅ `StatCard.test.jsx` - 5 tests
- ✅ `CourseList.test.jsx` - 9 tests
- ✅ `DashboardHeader.test.jsx` - 7 tests
- ✅ `RecentEnrollments.test.jsx` - 10 tests
- ✅ `AnalyticsSection.test.jsx` - 9 tests
- ✅ `dashboardConstants.test.js` - 13 tests

**Total Unit Tests**: 53 tests

### Integration Tests (1 file)
- ✅ `Dashboard.integration.test.jsx` - 8 tests

**Total Integration Tests**: 8 tests

### **Grand Total**: 61 tests

---

## 🚀 Running Tests

### Install Dependencies First

```bash
cd Frontend
npm install
```

Wait for the installation to complete (dependencies are currently installing).

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with UI

```bash
npm run test:ui
```

This opens an interactive browser UI to explore tests.

### Generate Coverage Report

```bash
npm run test:coverage
```

Coverage report will be generated in `coverage/` directory.

---

## 📁 Test File Structure

```
dashboard/
├── __tests__/
│   ├── unit/
│   │   ├── StatCard.test.jsx
│   │   ├── CourseList.test.jsx
│   │   ├── DashboardHeader.test.jsx
│   │   ├── RecentEnrollments.test.jsx
│   │   ├── AnalyticsSection.test.jsx
│   │   └── dashboardConstants.test.js
│   └── integration/
│       └── Dashboard.integration.test.jsx
```

---

## 🧪 What's Being Tested

### StatCard Component
- Renders title, value, and icon
- Applies correct color styling
- Handles different prop values

### CourseList Component
- Renders Global Overview option
- Displays all courses with status badges
- Shows Owner/Instructor chips
- Handles course selection
- Highlights selected course
- Handles empty course list

### DashboardHeader Component
- Renders title and subtitle
- Back button functionality
- Year range selectors
- Calendar icon display

### RecentEnrollments Component
- Displays enrollment list
- Shows student information (name, avatar, course)
- Displays payment amounts and dates
- Limits to 3 enrollments
- Shows empty state message
- Uses placeholder avatars when needed

### AnalyticsSection Component
- Renders all stat cards
- Shows/hides CourseActionBar based on selection
- Displays correct revenue and student counts
- Renders TrendsCharts and RecentEnrollments
- Formats large numbers correctly

### Dashboard Constants
- STATUS_THEMES structure
- generateChartData function
- getStatusKey mapping logic
- Edge case handling

### Dashboard Integration
- Complete dashboard rendering
- Course selection updates analytics
- Navigation functionality
- Data fetching on mount
- Revenue and student calculations
- Recent enrollments display

---

## 🛠️ Testing Stack

- **Test Runner**: Vitest (Vite-native, fast)
- **Testing Library**: React Testing Library
- **Assertions**: Vitest (Jest-compatible)
- **User Interactions**: @testing-library/user-event
- **DOM Matchers**: @testing-library/jest-dom

---

## 📝 Test Utilities

### Custom Render Function

Located in `test-utils.jsx`, provides:
- Redux Provider with mock store
- React Router (BrowserRouter)
- MUI ThemeProvider
- DashboardContext Provider

**Usage**:
```javascript
import { render, screen } from '../../../../../test-utils';

render(<MyComponent />);
```

### Mock Factories

```javascript
import { createMockStore, createMockDashboardContext } from '../../../../../test-utils';

const store = createMockStore({ /* initial state */ });
const context = createMockDashboardContext({ /* overrides */ });
```

---

## ✅ Test Quality Metrics

### Coverage Goals
- **Unit Tests**: 90%+ coverage
- **Integration Tests**: Key user flows
- **Critical Paths**: 100% coverage

### Test Characteristics
- ✅ Fast (unit tests run in milliseconds)
- ✅ Isolated (no external dependencies)
- ✅ Deterministic (same input = same output)
- ✅ Readable (clear test names and structure)
- ✅ Maintainable (uses test utilities)

---

## 🐛 Debugging Tests

### Run Single Test File

```bash
npm test StatCard.test.jsx
```

### Run Tests Matching Pattern

```bash
npm test -- --grep="CourseList"
```

### Debug in VS Code

Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test"],
  "console": "integratedTerminal"
}
```

---

## 📈 Next Steps

### Additional Tests to Consider

1. **CourseSelector.test.jsx** - Mobile drawer behavior
2. **TrendsCharts.test.jsx** - Chart rendering
3. **CourseActionBar.test.jsx** - Button actions
4. **useDashboardData.test.jsx** - Hook logic

### E2E Tests (Playwright)

For complete user workflows:
```bash
npm install -D playwright @playwright/test
npx playwright install
```

Create `__tests__/e2e/dashboard.spec.js` for:
- Login → Navigate to Dashboard
- Select course → Verify analytics update
- Change year range → Verify charts update
- Mobile drawer interaction

---

## 🎯 Benefits

1. **Confidence** - Refactor without fear
2. **Documentation** - Tests describe expected behavior
3. **Regression Prevention** - Catch bugs early
4. **Faster Development** - Quick feedback loop
5. **Better Design** - Testable code is better code

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 🤝 Contributing

When adding new components:
1. Write tests alongside component code
2. Aim for 90%+ coverage
3. Test user interactions, not implementation
4. Use descriptive test names
5. Follow existing test patterns

---

**Happy Testing! 🎉**
