import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api', key: process.env.MAILGUN_API_KEY
});

const defaultMailOptions = {
    to: ["codesfromannywhere@gmail.com"],
    subject: "Hello",
    html: "Testing some Mailgun awesomeness!",
}

export const sendMail = async ({ to, subject, html } = defaultMailOptions) => {

    return mg.messages.create("sandbox9cd255cb3962432a92bc584158677a8b.mailgun.org", {
        from: "You got Mailguned <mailgun@ssandbox9cd255cb3962432a92bc584158677a8b.mailgun.org>",
        to,
        subject,
        html
    })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error
}
// await sendMail();