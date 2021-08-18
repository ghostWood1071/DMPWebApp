using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Diagnostics;
using Newtonsoft.Json;
using DMPWebApp.Models;
using System.Text;
using System.Web.Mvc;
namespace DMPWebApp.Controllers
{
    public class Auth
    {
        public static bool Authenthicate(HttpSessionStateBase session)
        {
            if (session["userID"] == null || session["password"] == null)
                return false;

            return true;
        }
    }
}