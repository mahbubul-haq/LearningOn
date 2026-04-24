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
            return res.status(404).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Invalid Certificate - LearningOn</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f3f4f6; margin: 0; }
                        .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center; max-width: 400px; width: 100%; border-top: 5px solid #ef4444; }
                        .icon { font-size: 48px; color: #ef4444; margin-bottom: 20px; }
                        h1 { margin: 0 0 10px; color: #1f2937; font-size: 24px; }
                        p { margin: 0; color: #6b7280; font-size: 16px; line-height: 1.5; }
                        .footer { margin-top: 30px; font-size: 13px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 15px; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <div class="icon">❌</div>
                        <h1>Invalid Certificate</h1>
                        <p>We couldn't find a certificate matching the provided ID: <strong>${certificateId}</strong>.</p>
                        <div class="footer">
                            Verification provided by ${process.env.CLIENT_URL ? process.env.CLIENT_URL.replace('http://', '').replace('https://', '') : 'LearningOn'}
                        </div>
                    </div>
                </body>
                </html>
            `);
        }

        const formattedDate = new Date(certificate.issueDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const courseTitle = certificate.courseId ? certificate.courseId.courseTitle : 'Unknown Course';
        const studentName = certificate.userId ? certificate.userId.name : 'Unknown Student';

        return res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verified Certificate - LearningOn</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f0fdf4; margin: 0; padding: 20px; box-sizing: border-box; }
                    .card { background: white; padding: 50px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); text-align: center; max-width: 600px; width: 100%; border: 1px solid #dcfce7; position: relative; overflow: hidden; }
                    .card::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, #10b981, #3b82f6); }
                    .icon { font-size: 60px; color: #10b981; margin-bottom: 20px; }
                    h1 { margin: 0 0 15px; color: #111827; font-size: 28px; font-weight: 700; }
                    .status { display: inline-block; background-color: #dcfce7; color: #166534; padding: 6px 16px; border-radius: 9999px; font-size: 14px; font-weight: 600; margin-bottom: 30px; letter-spacing: 0.5px; }
                    .details { text-align: left; background: #f9fafb; padding: 25px; border-radius: 12px; margin-top: 10px; }
                    .detail-item { margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 15px; }
                    .detail-item:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
                    .detail-label { display: block; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 5px; }
                    .detail-value { font-size: 18px; color: #1f2937; font-weight: 500; }
                    .cert-id { margin-top: 30px; font-size: 14px; color: #9ca3af; font-family: monospace; }
                    .footer { margin-top: 20px; font-size: 13px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 15px; }
                </style>
            </head>
            <body>
                <div class="card">
                    <div class="icon">🏆</div>
                    <h1>Certificate Verified</h1>
                    <div class="status">✓ OFFICIAL RECORD</div>
                    
                    <div class="details">
                        <div class="detail-item">
                            <span class="detail-label">Awarded To</span>
                            <span class="detail-value">${studentName}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Course Completed</span>
                            <span class="detail-value">${courseTitle}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Issue Date</span>
                            <span class="detail-value">${formattedDate}</span>
                        </div>
                    </div>
                    
                    <div class="cert-id">
                        Certificate ID: ${certificateId}
                    </div>
                    <div class="footer">
                        Verified by ${process.env.CLIENT_URL ? process.env.CLIENT_URL.replace('http://', '').replace('https://', '') : 'LearningOn'}
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (err) {
        console.error("Error verifying certificate:", err);
        return res.status(500).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Server Error</title>
                <style>
                    body { font-family: sans-serif; text-align: center; padding: 50px; color: #333; }
                </style>
            </head>
            <body>
                <h1>Internal Server Error</h1>
                <p>There was an error verifying the certificate. Please try again later.</p>
            </body>
            </html>
        `);
    }
}

export {
    generateCertificate,
    getCertificateDocument,
    verifyCertificatePublic
}