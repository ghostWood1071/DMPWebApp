using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMPWebApp.Controllers
{
    public class NotifyController : Controller
    {
        // GET: Notify
        public ActionResult Index()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // GET: Notify/Details/5
        public ActionResult Details(int id)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // GET: Notify/Create
        public ActionResult Create()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        

        // GET: Notify/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        

        
       
    }
}
