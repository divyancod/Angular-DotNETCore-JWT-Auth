using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JWTTokenDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MyUserController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return Ok(new { user = "I am a user" });
        }

    }
}
