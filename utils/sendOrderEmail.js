import nodemailer from "nodemailer";

const sendOrderEmailToAdmin = async (order) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // or your SMTP provider
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_EMAIL_PASS,
            },
        });

        const itemsList = order.items
            .map(item => `${item.name} x ${item.quantity}`)
            .join(', ');

        const mailOptions = {
            from: `"Cafe Orders" <${process.env.ADMIN_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "New Order Received",
            text: `📦 New Order Details:\n
Name: ${order.customer.firstName}
Email: ${order.customer.email}
Phone: ${order.customer.phone}
Table No: ${order.customer.tableNo}

🛒 Items:
${itemsList}

💰 Total Amount: ₹${order.amount}
Status: ${order.status}
`,
        };

        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error("Failed to send order email to admin:", err.message);
    }
};

export default sendOrderEmailToAdmin;
