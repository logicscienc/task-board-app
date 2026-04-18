using Microsoft.AspNetCore.Mvc;
using TaskBoard.Api.Models;
using TaskBoard.Api.Services.Interfaces;

namespace TaskBoard.Api.Controllers
{
    [ApiController]
    [Route("api")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

       
        // GET: /api/projects/{projectId}/tasks
     
        [HttpGet("projects/{projectId}/tasks")]
        public async Task<IActionResult> GetTasks(
            int projectId,
            [FromQuery] int? status,
            [FromQuery] int? priority,
            [FromQuery] string sortBy = "createdAt",
            [FromQuery] string sortDir = "desc",
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await _taskService.GetTasks(
                projectId,
                status,
                priority,
                sortBy,
                sortDir,
                page,
                pageSize
            );

            return Ok(result);
        }

       
        // POST: /api/projects/{projectId}/tasks
       
        [HttpPost("projects/{projectId}/tasks")]
        public async Task<IActionResult> CreateTask(int projectId, TaskItem task)
        {
            try
            {
                var created = await _taskService.CreateTask(projectId, task);
                return CreatedAtAction(nameof(GetTask), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

       
        // GET: /api/tasks/{id}
       
        [HttpGet("tasks/{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _taskService.GetTaskById(id);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

       
        // PUT: /api/tasks/{id}
        
        [HttpPut("tasks/{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskItem task)
        {
            try
            {
                var updated = await _taskService.UpdateTask(id, task);

                if (updated == null)
                    return NotFound();

                return Ok(updated);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

       
        // DELETE: /api/tasks/{id}
       
        [HttpDelete("tasks/{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var deleted = await _taskService.DeleteTask(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}