using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace DMPWebApp.Controllers
{
    public class ProfileController : Controller
    {
        // GET: Profile
        public ActionResult Index()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // GET: Profile/Details/5
        public ActionResult Details(int id)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // GET: Profile/Create
        public ActionResult Create()
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // POST: Profile/Create
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

        // GET: Profile/Edit/5
        public ActionResult Edit(int id)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // POST: Profile/Edit/5
        [HttpPost]
        public string Edit()
        {
            try
            {
                HttpPostedFileBase file = Request.Files[0];
                string folderName = Request.Form["personal"];
                string fileName = file.FileName;
                string url = Server.MapPath("~/Assets/avatar/")+folderName;
                if (!Directory.Exists(url))
                    Directory.CreateDirectory(url);

                if (System.IO.File.Exists(url + '/' + file.FileName))
                {
                    int size = Directory.GetFiles(url, file.FileName + "*").Length;
                    fileName = file.FileName.Substring(0, file.FileName.LastIndexOf(".")) + size + file.FileName.Substring(file.FileName.LastIndexOf("."));
                }

                file.SaveAs(url + "/" + fileName);

                return "/Assets/avatar/" +folderName+ "/" + fileName;

            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                return "fail";
            }
        }

        // GET: Profile/Delete/5
        public ActionResult Delete(int id)
        {
            if (!Auth.Authenthicate(Session))
            {
                return Redirect("/Login");
            }
            return View();
        }

        // POST: Profile/Delete/5
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

        [HttpPost]
        public string UploadAvatar(string memberID)
        {
            try
            {
                string fileName = "";
                string url = Server.MapPath("~/Asset/avatar/") + memberID;
                HttpPostedFileBase file = Request.Files[0];
                if (!Directory.Exists(url))
                    Directory.CreateDirectory(url);

                if (System.IO.File.Exists(url+'/'+file.FileName))
                {
                    int size =  Directory.GetFiles(url, file.FileName + "*").Length;
                    fileName = file.FileName.Substring(0, file.FileName.LastIndexOf(".")) + size;
                }

                file.SaveAs(url + "/" + fileName);

                return url + "/" + fileName;

            } catch(Exception e)
            {
                Debug.WriteLine(e.Message);
                return "fail";
            }
        }
    }
}
