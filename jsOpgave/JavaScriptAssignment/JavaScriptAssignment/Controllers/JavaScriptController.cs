namespace JavaScriptAssignment.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    public class JavaScriptController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult JavaScriptGame()
        {
            return View();
        }
    }
}