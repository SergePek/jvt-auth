const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            secureConnection: false,
            port: 465,
            secure: true,
            auth: {
                user: 'pekchiorckin@mail.ru',
                pass: 'YyJrqkSuNT0fSWdypCBC'
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: "pekchiorckin@mail.ru",
            to,
            subject: "Активация аккаунта на " + process.env.API_URL,
            text: '',
            html:
                `
                     <div>
                     <h1>Для активации кликнуть<h1>
                     <a href="${link}">${link}</a>
                    </div>
            
                `
        })
    }
}

module.exports = new MailService();