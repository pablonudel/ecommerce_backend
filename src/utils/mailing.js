import nodemailer from 'nodemailer'
import {config} from '../configs/config.js'

export default class MailingService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.NODEMAILER.EMAIL,
                pass: config.NODEMAILER.PASSWORD
            }
        });
    }

    async sendMail ({from, to, subject, html}) {
        let result = await this.transporter.sendMail({
            from, to, subject, html
        })
        return result
    }
}

export const generateMailBody = (order)=>{
    const orderProducts = []
    order.products.forEach(p=>{
        orderProducts.push(`<tr style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">
        <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">${p.code}</th>
        <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">${p.name}</th>
        <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">${p.qty}</th>
        <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">$${p.price}</th>
        <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">$${p.subTotal}</th>
    </tr>`)
    })

    const tableBody = orderProducts.join('')
    const cartTable = `<table style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">
    <thead>
        <tr style="padding:5px 7px; border:1px solid #555; text-align:left">
            <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">CÓDIGO</th>
            <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">PRODUCTO</th>
            <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">CANTIDAD</th>
            <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">PRECIO</th>
            <th style="padding:5px 7px; border:1px solid #555; text-align:left; border-collapse: collapse;">SUBTOTAL</th>
        </tr>
    </thead>
    <tbody>`+tableBody+`</tr>
        </tbody>
    </table>`
    
    const mailBody = `
    <h3>Detalle de su compra</h3>
    `+cartTable+`<h3>Total: $${order.total}</h3><p>¡Muchas gracias, vuelvas prontos!</p>`
    
    return mailBody
}