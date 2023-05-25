import { Injectable } from '@nestjs/common';
import * as path from 'path';
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
@Injectable()
export class EmailService {


    public async sendEmailVerificationURL(url: string) {
        const transporter = this.initTransport()

        try {
            const info = await transporter.sendMail({
                from: 'krasnobo@gmail.com',
                to: "rolikpolo34@gmail.com",
                subject: "SIQURO", // Subject line
                template: 'email', // the name of the template file i.e email.handlebars
                context: {
                    url: url, // replace {{name}} with Adebola
                    company: 'CARTHAGEN' // replace {{company}} with My Company
                }
            });
            console.log('Email send', info)
            return info
        } catch (e) {
            console.log(e)
        }
    }

    public async sendEmail(verifyURL: string) {


        const transporter = this.initTransport()

        try {
            const info = await transporter.sendMail({
                from: 'krasnobo@gmail.com',
                to: "rolikpolo34@gmail.com",
                subject: "SIQURO", // Subject line
                template: 'email', // the name of the template file i.e email.handlebars
                context: {
                    name: verifyURL, // replace {{name}} with Adebola
                    company: 'CARTHAGEN' // replace {{company}} with My Company
                }
            });
            console.log('Email send', info)
            return info
        } catch (e) {
            console.log(e)
        }

    }
    private initTransport() {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        transporter.use('compile', hbs(this.generateHandlerOptions()))
        return transporter
    }

    private generateHandlerOptions() {
        return {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),

        }
    }

}
