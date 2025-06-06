using Microsoft.EntityFrameworkCore;
using TaskManager.Backend.Models;

namespace TaskManager.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<TaskItem> Tasks => Set<TaskItem>();
    }
}