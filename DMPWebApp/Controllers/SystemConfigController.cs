using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMPWebApp.Controllers
{
    public class SystemConfigController : Controller
    {
        // GET: SystemConfig
        public ActionResult Index()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }
        public ActionResult JobEachMonth()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // GET: SystemConfig/Details/5
        public ActionResult Details(int id)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // GET: SystemConfig/Create
        public ActionResult Decentralization()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // POST: SystemConfig/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: SystemConfig/Edit/5
        public ActionResult Edit(int id)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // POST: SystemConfig/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: SystemConfig/Delete/5
        public ActionResult Delete(int id)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // POST: SystemConfig/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
