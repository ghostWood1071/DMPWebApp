using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using DMPWebApp.App_Start;
using System.Net;

namespace DMPWebApp.Extensions
{
    public class Mailer
    {
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Password { get; set; }
        public string HostName { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        
        public void Send()
        {
            if(this.Sender == null)
                this.Sender = AppConfig.MAIL_HOST;

            if (this.Password == null)
                this.Password = AppConfig.MAIL_PASS;

            if (this.HostName == null)
                this.HostName = AppConfig.MAIL_NAME;

            var sender = new MailAddress(Sender, HostName);
            var receiver = new MailAddress(Receiver);

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(sender.Address, Password)
            };

            using(var mess = new MailMessage(sender, receiver))
            {
                mess.Subject = Title;
                mess.Body = Content;
                smtp.Send(mess);
            }

        }

        public void Send(List<string> emails)
        {
            if (this.Sender == null)
                this.Sender = AppConfig.MAIL_HOST;

            if (this.Password == null)
                this.Password = AppConfig.MAIL_PASS;

            if (this.HostName == null)
                this.HostName = AppConfig.MAIL_NAME;

            var sender = new MailAddress(Sender, HostName);
            

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(sender.Address, Password)
            };

            using (var mess = new MailMessage())
            {
                mess.From = sender;
                foreach(var email in emails)
                {
                    mess.To.Add(new MailAddress(email));
                }
                mess.Subject = Title;
                mess.Body = Content;
                smtp.Send(mess);
            }
        }
    }
}