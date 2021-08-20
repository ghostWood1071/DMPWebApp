using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMPWebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }
    }
}