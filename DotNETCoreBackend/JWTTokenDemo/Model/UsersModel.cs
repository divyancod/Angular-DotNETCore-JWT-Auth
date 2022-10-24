using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JWTTokenDemo.Model
{
    public class UsersModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public UsersModel()
        {

        }
        public UsersModel(string email,string password)
        {
            this.Email = email;
            this.Password = password; 
            this.IsActive = true; 
        }

    }
}
