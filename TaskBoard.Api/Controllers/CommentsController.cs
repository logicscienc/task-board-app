using Microsoft.AspNetCore.Mvc;
using TaskBoard.Api.Models;
using TaskBoard.Api.Services.Interfaces;

namespace TaskBoard.Api.Controllers
{
    [ApiController]
    [Route("api")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

       
        // GET: /api/tasks/{taskId}/comments
        
        [HttpGet("tasks/{taskId}/comments")]
        public async Task<IActionResult> GetComments(int taskId)
        {
            var comments = await _commentService.GetCommentsByTask(taskId);
            return Ok(comments);
        }

       
        // POST: /api/tasks/{taskId}/comments
      
        [HttpPost("tasks/{taskId}/comments")]
       public async Task<IActionResult> CreateComment(int taskId, Comment comment)
{
    try
    {
        var created = await _commentService.CreateComment(taskId, comment);
        return CreatedAtAction(nameof(GetComments), new { taskId }, created);
    }
    catch (Exception ex)
    {
        return BadRequest(new { message = ex.Message });
    }
}
        
        // DELETE: /api/comments/{id}
       
        [HttpDelete("comments/{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var deleted = await _commentService.DeleteComment(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}