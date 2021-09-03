using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DMPWebApp.Extensions
{
    public class VerifyRole
    {
        string userID;
        string password;
        public VerifyRole(string userID, string password)
        {
            this.userID = userID;
            this.password = password;
        }

    }
}