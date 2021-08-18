using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DMPWebApp.Models
{
    public class UserResult
    {
        public string MemberID { get; set; }
        public string FullName { get; set; }
        public string ReferralID { get; set; }
        public string Gender { get; set; }
        public string Birthday { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string IDCard { get; set; }
        public string IDCard_PlaceIssue { get; set; }
        public string IDCard_DateIssue { get; set; }
        public string Password { get; set; }
        public string PositionID { get; set; }
        public int RoleID { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string Avatar { get; set; }
    }
}