using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            // Total Projects
            var totalProjects = await _context.Projects.CountAsync();

            // Total Tasks
            var totalTasks = await _context.Tasks.CountAsync();

            // Overdue Tasks
            var overdueTasks = await _context.Tasks
                .Where(t => t.DueDate.HasValue &&
                            t.DueDate < DateTime.UtcNow &&
                            t.Status != Status.Done)
                .CountAsync();

            // Tasks due in next 7 days
            var dueSoon = await _context.Tasks
                .Where(t => t.DueDate.HasValue &&
                            t.DueDate >= DateTime.UtcNow &&
                            t.DueDate <= DateTime.UtcNow.AddDays(7))
                .CountAsync();

            // Status Breakdown
            var todo = await _context.Tasks.CountAsync(t => t.Status == Status.Todo);
            var inProgress = await _context.Tasks.CountAsync(t => t.Status == Status.InProgress);
            var review = await _context.Tasks.CountAsync(t => t.Status == Status.Review);
            var done = await _context.Tasks.CountAsync(t => t.Status == Status.Done);

            return Ok(new
            {
                totalProjects,
                totalTasks,
                overdueTasks,
                dueSoon,
                statusBreakdown = new
                {
                    todo,
                    inProgress,
                    review,
                    done
                }
            });
        }
    }
}