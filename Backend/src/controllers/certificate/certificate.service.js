import Certificate from "../../models/Certificate.js";
import QuizAttempt from "../../models/QuizAttempt.js";
import Course from "../../models/Course.js";
const createCertificate = async (courseId, userId, achievedScore, maxScore) => {
    try {
        const certificate = await Certificate.create({
            courseId,
            userId,
            certificateId: `LC-CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            achievedScore,
            maxScore,
            issueDate: new Date()
        });

        return certificate;

    } catch (err) {
        // certificate already exists
        if (err.code === 11000) {
            return await Certificate.findOne({ courseId, userId });
        }

        return null;
    }
};

const finalizeCertificate = async (certificate) => {
    try {

        const quizAttempts = await QuizAttempt.find({
            courseId: certificate.courseId,
            userId: certificate.userId
        }).select("score status quizEndTime").lean();

        if (!quizAttempts.length) {
            return;
        }

        let now = new Date();
        let hasActive = false, score = 0;

        for (const attempt of quizAttempts) {
            if (attempt.quizEndTime > now && attempt.status !== "completed") {
                hasActive = true;
                break;
            }

            score += attempt.score || 0;
        }

        if (hasActive) return;
        const result = await Certificate.findOneAndUpdate({ _id: certificate._id, $or: [{ isFinal: false }, { isFinal: { $exists: false } }] }, { $set: { isFinal: true, achievedScore: score } }, { new: true });
        return result || { ...certificate, isFinal: true, achievedScore: score };
    } catch (err) {
        console.log(err);
        return null;
    }
}

export { createCertificate, finalizeCertificate }