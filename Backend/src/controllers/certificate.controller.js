import Certificate from "../models/Certificate.js";
import CourseProgress from "../models/CourseProgress.js";
import Course from "../models/Course.js";
import People from "../models/People.js";

const generateCertificate = async (req, res) => {
    try {
        let { courseId, certificateId } = req.body;
        const userId = req.userId;

        const courseProgress = await CourseProgress.findOne({ courseId, userId }).select("complete completionDate").lean();
        if (!courseProgress) {
            return res.status(404).json({ message: "Course progress not found" });
        }
        if (!courseProgress.completionDate) {
            return res.status(400).json({ message: "Course not completed" });
        }


        let certificate = await Certificate.findOne({
            courseId,
            userId,
        });
        if (!certificateId) {
            certificateId = `LC-CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
        }

        if (!certificate) {
            certificate = await Certificate.create({
                courseId,
                userId,
                certificateId,
                issueDate: new Date(),
            });
        }
        const issueDate = certificate?.issueDate || new Date();

        let course = await Course.findById({ _id: courseId }).select("courseTitle").lean();
        const user = await People.findById({ _id: userId }).select("name").lean();
        if (!course || !user) {
            return res.status(404).json({ message: "Course or user not found" });
        }

        return res.status(200).json({
            success: true,
            certificate,
            message: "Certificate generated successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error generating certificate" });
    }
}

const getCertificateDocument = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.userId;

        const certificate = await Certificate.findOne({ courseId, userId }).lean();
        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }

        return res.status(200).json({
            success: true,
            certificate: certificate
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: "Error getting certificate" });
    }
}

export {
    generateCertificate,
    getCertificateDocument
}