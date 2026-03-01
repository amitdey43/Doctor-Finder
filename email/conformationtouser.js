require("dotenv").config();
const sendmail = async ({ email, subject, message }) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key":process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "SynptoCare",
          email: "akd12345678901@gmail.com",
        },
        to: [{ email }],
        subject,
        htmlContent: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    console.log("Brevo API email sent:", data);
    return data;
  } catch (err) {
    console.error("Brevo API error:", err);
    throw err;
  }
};
module.exports= sendmail;