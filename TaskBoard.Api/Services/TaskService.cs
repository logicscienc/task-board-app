using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.Models;
using TaskBoard.Api.Services.Interfaces;

namespace TaskBoard.Api.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        
        // GET TASKS (filter + sort + pagination)
      
        public async Task<object> GetTasks(
            int projectId,
            int? status,
            int? priority,
            string sortBy,
            string sortDir,
            int page,
            int pageSize)
        {
            var query = _context.Tasks
                .Where(t => t.ProjectId == projectId)
                .AsQueryable();

            // Filtering
            if (status.HasValue)
                query = query.Where(t => (int)t.Status == status);

            if (priority.HasValue)
                query = query.Where(t => (int)t.Priority == priority);

            // Sorting
            query = sortBy.ToLower() switch
            {
                "duedate" => sortDir == "asc" ? query.OrderBy(t => t.DueDate) : query.OrderByDescending(t => t.DueDate),
                "priority" => sortDir == "asc" ? query.OrderBy(t => t.Priority) : query.OrderByDescending(t => t.Priority),
                _ => sortDir == "asc" ? query.OrderBy(t => t.CreatedAt) : query.OrderByDescending(t => t.CreatedAt)
            };

            // Pagination
            var totalCount = await query.CountAsync();

            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new
            {
                data,
                page,
                pageSize,
                totalCount,
                totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            };
        }

       
        // GET SINGLE TASK
        
        public async Task<TaskItem?> GetTaskById(int id)
        {
            return await _context.Tasks
                .Include(t => t.Comments)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

       
        // CREATE TASK
       
        public async Task<TaskItem> CreateTask(int projectId, TaskItem task)
        {
             // 1. Check if project exists
    var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);
    if (!projectExists)
        throw new Exception("Project not found");

    //  2. Validate due date
    if (task.DueDate.HasValue && task.DueDate < DateTime.UtcNow.Date)
        throw new Exception("Due date must be today or future");

    //  Normal logic
    task.ProjectId = projectId;
    task.CreatedAt = DateTime.UtcNow;

    _context.Tasks.Add(task);
    await _context.SaveChangesAsync();

    return task;
        }

       
        // UPDATE TASK
       
        public async Task<TaskItem?> UpdateTask(int id, TaskItem updated)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return null;

            
            if (updated.DueDate.HasValue && updated.DueDate < DateTime.UtcNow.Date)
        throw new Exception("Due date must be today or future");


            task.Title = updated.Title;
            task.Description = updated.Description;
            task.Priority = updated.Priority;
            task.Status = updated.Status;
            task.DueDate = updated.DueDate;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return task;
        }

        
        // DELETE TASK
        
        public async Task<bool> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}