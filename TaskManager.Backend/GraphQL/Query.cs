using TaskManager.Backend.Models;
using TaskManager.Backend.Data;

public class Query
{
    public IQueryable<TaskItem> GetTasks(AppDbContext db) =>
        db.Tasks;
}