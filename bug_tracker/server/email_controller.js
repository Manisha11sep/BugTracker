const nodeMailer = require("nodemailer");
module.exports = {
  sendMessage(req, res) {
    console.log("on server side Email", req.body);
    const { to, subject, body, username, email, profile_pic } = req.body;
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "fluffybugtracker@gmail.com",
        pass: "#devlife"
      }
    });
    let mailOptions = {
      from: "fluffybugtracker@gmail.com", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      // text: body, // plain text body
      html: `<div text-align:center; '><h3>${body}</h3>
            <br />
            <br />
            <div><p><ul text-align: left; margin-left:30px;' >
            <section style='font-size: 25px; color: red; font-weight:bold;padding-bottom:10px'>Have a great day </section>
            <li style='display:flex;'>
            <section style='font-size: 25px;color: green; padding-bottom:10px'>Best Regards: ${username}</section></li>
            <img style='width:300px' src=${profile_pic} alt='Profile pic'/>
            <section style='font-size: 25px;color: green;padding-bottom:10px'>You can write back: ${email} <a style='color:blue; text-decoration: underline;'
            </section></li>
             </ul></p></div></div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
      res.render("index");
    });
  }
};
