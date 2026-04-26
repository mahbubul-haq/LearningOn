import Certificate from "../../models/Certificate.js";
import CourseProgress from "../../models/CourseProgress.js";
import Course from "../../models/Course.js";
import People from "../../models/People.js";

// not used
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
        }).lean();

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
        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        return res.status(200).json({
            success: true,
            certificate,
        });
    }
    catch (err) {
        // console.log(err);
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

const verifyCertificatePublic = async (req, res) => {
    try {
        const { certificateId } = req.params;

        const certificate = await Certificate.findOne({ certificateId })
            .populate("courseId", "courseTitle")
            .populate("userId", "name")
            .lean();

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "We couldn't find a certificate matching the provided ID."
            });
        }

        const formattedDate = new Date(certificate.issueDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const courseTitle = certificate.courseId ? certificate.courseId.courseTitle : 'Unknown Course';
        const studentName = certificate.userId ? certificate.userId.name : 'Unknown Student';

        return res.status(200).json({
            success: true,
            certificate: {
                certificateId: certificate.certificateId,
                courseTitle,
                studentName,
                issueDate: formattedDate,
                isGraded: certificate.isGraded,
                scorePercentage: certificate.scorePercentage
            }
        });
    } catch (err) {
        console.error("Error verifying certificate:", err);
        return res.status(500).json({
            success: false,
            message: "There was an error verifying the certificate. Please try again later."
        });
    }
}

export {
    generateCertificate,
    getCertificateDocument,
    verifyCertificatePublic
}