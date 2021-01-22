using Microsoft.EntityFrameworkCore;
namespace projekatWP_bar.Model
{
    public class BarContext: DbContext{
        public DbSet<Glass> Glasses{get; set;}
        public DbSet<Order> Orders {get; set;}

        public BarContext(DbContextOptions options):base(options){
            
        }
    }

}