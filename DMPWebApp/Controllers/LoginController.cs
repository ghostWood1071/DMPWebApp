using DMPWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Diagnostics;
using DMPWebApp.App_Start;
namespace DMPWebApp.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            Session.RemoveAll();
            return View();
        }

        // GET: Login/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Login/Create
        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Reset()
        {
            return View();
        }

        // POST: Login/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                HttpClient client = new HttpClient();
                string Account = collection.GetValue("Account").ConvertTo(typeof(string)).ToString();
                string Password = collection.GetValue("Password").ConvertTo(typeof(string)).ToString();
                HttpContent content = new StringContent(JsonConvert.SerializeObject(new Account() {
                    UserID = Account,
                    Password = Password
                }), System.Text.Encoding.UTF8, "application/json");
                string result = client.PostAsync($"{AppConfig.API_DOMAIN}/CheckAccount", content).Result.Content.ReadAsStringAsync().Result;
                UserResult userResult = JsonConvert.DeserializeObject<UserResult>(result);
                if (userResult != null)
                {
                    Session.Add("userID", userResult.MemberID);
                    Session.Add("password", userResult.Password);
                    TempData["userID"] = userResult.MemberID;
                    TempData["avatar"] = userResult.Avatar;
                    TempData["position"] = userResult.PositionID;
                    return Redirect("/Home");
                }
                else
                {
                    TempData["loginfail"] = "Thông tin đăng nhập sai";
                    return RedirectToAction("Index");
                }
            }
            catch(Exception e)
            {
                TempData["loginfail"] = "Thông tin đăng nhập sai";
                Debug.WriteLine(e.Message);
                return View();
            }
        }

        // GET: Login/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Login/Edit/5
        

        // GET: Login/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Login/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
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
