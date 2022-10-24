using JWTTokenDemo.Model;
using Microsoft.EntityFrameworkCore;

namespace JWTTokenDemo.Context
{
    public class ContextDB:DbContext
    {
        public ContextDB()
        {

        }
        public ContextDB(DbContextOptions<ContextDB> options):base(options)
        {

        }
        public DbSet<UsersModel> Users { get; set; }
    }
}
