using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.Models;
using TaskBoard.Api.Services.Interfaces;

namespace TaskBoard.Api.Services
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _context;

        public CommentService(AppDbContext context)
        {
            _context = context;
        }

       
        // GET COMMENTS BY TASK
      
        public async Task<IEnumerable<Comment>> GetCommentsByTask(int taskId)
        {
            return await _context.Comments
                .Where(c => c.TaskId == taskId)
                .ToListAsync();
        }

       
        // CREATE COMMENT
      
        public async Task<Comment> CreateComment(int taskId, Comment comment)
        {
            //  check task exists
            var taskExists = await _context.Tasks.AnyAsync(t => t.Id == taskId);
            if (!taskExists)
                throw new Exception("Task not found");

            comment.TaskId = taskId;
            comment.CreatedAt = DateTime.UtcNow;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

       
        // DELETE COMMENT
       
        public async Task<bool> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
                return false;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}