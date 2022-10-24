using JWTTokenDemo.Context;
using JWTTokenDemo.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWTTokenDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private MyTokenService MyTokenService;
        private ContextDB contextDB;
        public AuthController(MyTokenService myTokenService,ContextDB contextDB)
        {
            MyTokenService = myTokenService;
            this.contextDB = contextDB;
        }
        [HttpPost("/login")]
        public IActionResult login(string email,string password)
        {
            if(!string.IsNullOrEmpty(email)&& !string.IsNullOrEmpty(password))
            {
                UsersModel user = contextDB.Users.Where(x=>x.Email == email && x.Password==password).FirstOrDefault();
                if(user==null)
                {
                    return BadRequest("Invalid Email or Password");
                }
                return Ok(new {id=user.Id,email=user.Email,isActive=user.IsActive,token= MyTokenService.GenerateToken(user.Email)});
            }
            return BadRequest("Fields required");
        }
        [HttpPost("/signup")]
        public async Task<IActionResult> signup(string email,string password)
        {
            if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
            {
                UsersModel user = contextDB.Users.Where(x => x.Email == email).FirstOrDefault();
                if(user!=null)
                {
                    return BadRequest("Email Id already exists");
                }
                user = new UsersModel(email,password);
                await contextDB.Users.AddAsync(user);
                await contextDB.SaveChangesAsync();
                return Ok(new { id = user.Id, email = user.Email, isActive = user.IsActive, token = MyTokenService.GenerateToken(user.Email) });
            }
            return BadRequest("Fields required");
        }

    }
}
