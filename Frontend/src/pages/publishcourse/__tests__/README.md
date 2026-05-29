# Publish course upload tests

| Layer | Location | What it verifies |
|-------|----------|------------------|
| **Unit** | `unit/` | `courseLessonsApi`, `VideoUpload` persist handlers |
| **Integration** | `integration/` | `CourseMedia` + mocked APIs |
| **Scenario** | `scenario/` | Add lesson → UI reflects server `courseInfo` |

## Run

```bash
cd Frontend
npm test -- src/pages/publishcourse/__tests__
```

Or a single file:

```bash
npm test -- src/pages/publishcourse/__tests__/unit/courseLessonsApi.test.js
```
