import Certificate from "../../models/Certificate.js";

const createCertificate = async (courseId, userId, scorePercentage, isGraded) => {
    try {
        const certificate = await Certificate.create({
            courseId,
            userId,
            certificateId: `LC-CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            scorePercentage: Math.max(0, Math.round(scorePercentage * 100) / 100),
            isGraded,
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

export { createCertificate }