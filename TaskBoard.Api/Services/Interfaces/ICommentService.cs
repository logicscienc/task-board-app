using TaskBoard.Api.Models;

namespace TaskBoard.Api.Services.Interfaces
{
    public interface ICommentService
    {
        Task<IEnumerable<Comment>> GetCommentsByTask(int taskId);

        Task<Comment> CreateComment(int taskId, Comment comment);

        Task<bool> DeleteComment(int id);
    }
}