import { Injectable } from '@nestjs/common';
import * as path from 'path';
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
@Injectable()
export class EmailService {


    public async sendEmailVerificationURL(email:string,url: string) {
        const transporter = this.initTransport()

        try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL_LOGIN,
                to: email,
                subject: "SIQURO", // Subject line
                template: 'email', // the name of the template file i.e email.handlebars
                context: {
                    url: url, // replace {{name}} with Adebola
                    company: 'SIQURO' // replace {{company}} with My Company
                }
            });
            console.log('Email sent', info)
            return info
        } catch (e) {
            console.log(e)
        }
    }

    public async sendEmail(verifyURL: string) {
        const transporter = this.initTransport()

        try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL_LOGIN,
                to: "krasnobo@gmail.com",
                subject: "SIQURO", // Subject line
                template: 'email', // the name of the template file i.e email.handlebars
                context: {
                    name: verifyURL, // replace {{name}} with Adebola
                    company: 'SKULLSKINS' // replace {{company}} with My Company
                }
            });
            console.log('Email send', info)
            return info
        } catch (e) {
            console.log("Error", e)
        }

    }
    private initTransport() {

        const transporter = nodemailer.createTransport({
            name: 'siquro.com',
            host: 'mail.siquro.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        transporter.use('compile', hbs(this.generateHandlerOptions()))
        return transporter
    }

    // Email templates
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
