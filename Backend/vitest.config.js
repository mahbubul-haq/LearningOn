import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        setupFiles: ["./src/tests/setup/vitest.setup.js"],
        include: ["src/tests/**/*.test.js"],
        testTimeout: 30000,
        hookTimeout: 60000,
        fileParallelism: false,
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            include: [
                "src/services/courses/course.lesson.service.js",
                "src/controllers/courses/course.lesson.controller.js",
            ],
        },
    },
});
