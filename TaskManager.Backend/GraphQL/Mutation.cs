using TaskManager.Backend.Models;
using TaskManager.Backend.Data;

public class Mutation
{
    public async Task<TaskItem> CreateTask(
        [Service] AppDbContext db,
        string title,
        string description)
    {
        var task = new TaskItem { Title = title, Description = description };
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        return task;
    }

    public async Task<TaskItem?> UpdateTaskStatus(
        [Service] AppDbContext db,
        int id,
        string status)
    {
        var task = await db.Tasks.FindAsync(id);
        if (task == null) return null;
        task.Status = status;
        await db.SaveChangesAsync();
        return task;
    }
}