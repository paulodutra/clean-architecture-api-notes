import { Either, Right, right } from '@/shared'
import { MailServiceError } from '@/usecases/errors/mail-service-error'
import { EmailOptions, EmailService } from '@/usecases/send-email/ports'
import { SendEmail } from '@/usecases/send-email'

const fromName = 'Teste'
const fromEmail = 'from_email@mail.com'
const toName = 'Any'
const toEmail = 'any@mail.com'
const subject = 'Teste email'
const emailBody = 'Test email'
const emailBodyHtml = '<b>Hello world attachment test</b>'
const attachmentFilePath = '../../resource/text.txt'
const attachment = [{
    filename: attachmentFilePath,
    contentType: 'text/plain'
}]

const mailOptions: EmailOptions = {
    host: 'test',
    port: 867,
    username: 'test',
    password: 'test',
    from: fromName + '' + fromEmail,
    to: toName + '<' + toEmail + '>',
    subject: subject,
    text: emailBody,
    html: emailBodyHtml,
    attachments: attachment
}

class MailServiceStub implements EmailService {
    async send(emailOptions: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
       return right(emailOptions) 
    }
}

describe('Send email to user', () => {
    test('should email user with valid name and email address', async() => {
      const mailServiceStub = new MailServiceStub()
      const useCase = new SendEmail(mailOptions, mailServiceStub)  
      const response = await useCase.perform({ name: toName, email: toEmail})
      expect(response).toBeInstanceOf(Right)
    })
})