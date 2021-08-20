using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMPWebApp.Controllers
{
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult Index()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        public ActionResult ImpportHistory()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // GET: Order/Details/5
        public ActionResult Details()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        public ActionResult AddOrder()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        public ActionResult UpdateOrder()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }



        // GET: Order/Create
        public ActionResult Create()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // POST: Order/Create
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

        // GET: Order/Edit/5
        public ActionResult Edit(int id)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // POST: Order/Edit/5
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

        // GET: Order/Delete/5
        public ActionResult Delete(int id)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // POST: Order/Delete/5
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
