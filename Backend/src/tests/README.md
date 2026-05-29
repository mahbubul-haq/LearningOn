# Course upload tests

Test pyramid for lesson/media upload persistence (`course.lesson.service` + routes).

| Layer | Location | What it verifies |
|-------|----------|------------------|
| **Unit** | `unit/` | Service logic with mocked `Course` + Cloudinary |
| **Integration** | `integration/` | HTTP routes + in-memory MongoDB |
| **Scenario** | `scenario/` | Multi-step instructor flows (add → upload → reload) |
| **E2E (API)** | `e2e/` | Full HTTP stack, ownership, final DB state |

## Run

```bash
cd Backend
npm install
npm test                 # all
npm run test:unit
npm run test:integration
npm run test:scenario
npm run test:e2e
npm run test:coverage
```

## Notes

- **Cloudinary** is mocked globally in `setup/vitest.setup.js` (no real uploads).
- **MongoDB** uses `mongodb-memory-server` (no external DB).
- **Auth** is injected in `helpers/testApp.js` (no JWT in tests).
