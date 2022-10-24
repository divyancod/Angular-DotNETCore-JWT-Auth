using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace JWTTokenDemo
{
    public class MyTokenService
    {
        public const string TokenSecret = "@@@IAM@@TOKEN@@SECRET";
        public string GenerateToken(string username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenSecret));
            var credientials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] { 
                                new Claim("Issuer","localhost"),
                                new Claim("Admin","localhost"),
                                new Claim(JwtRegisteredClaimNames.UniqueName,"test")
                                };

            var token = new JwtSecurityToken(issuer:"localhost",
                                            audience:"localhost",
                                            claims:claims,
                                            expires:DateTime.Now.AddMinutes(20),
                                            signingCredentials:credientials
                                            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
