namespace JavaScriptAssignment.Controllers
{
    using JavaScriptAssignment.Models;
    using Microsoft.AspNetCore.Mvc;
    using System;

    public class AtoaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(ContactModel model)
        {
            // Checks if the state of the model is valid and corresponds with the model created
            if (!this.ModelState.IsValid)
            {
                // In case it isn't we pass the model back to the same view
                return this.View(model);
            }

            try
            {
                // Uses the streamwriter to append messages to a text document. Preferably you'd use a database to store this.
                using (var file = 
                    new System.IO.StreamWriter(@"C:\Users\nics\Desktop\NVS\Opgaver\Opgave 8 - JavaScript\ContactAndCounter\contact.txt", true))
                {
                    file.Write(DateTime.Now.ToString()
                        + Environment.NewLine
                        + "Name: " + model.Name 
                        + "\nEmail: " + model.Email 
                        + "\nPhone: " + model.Phone 
                        + "\nMessage: " + model.Message 
                        + Environment.NewLine
                        + Environment.NewLine);
                }

                // Returns the user to the root upon submitting the contact formula
                    return this.RedirectToAction("Index", "Home");
            }
            catch
            {
                // In case of an error, the site is reloaded
                return this.View(model);
            }
        }
    }
}