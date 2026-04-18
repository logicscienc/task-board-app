using TaskBoard.Api.Models;

namespace TaskBoard.Api.Services.Interfaces
{
    public interface ITaskService
    {
        Task<object> GetTasks(int projectId, int? status, int? priority, string sortBy, string sortDir, int page, int pageSize);

        Task<TaskItem?> GetTaskById(int id);

        Task<TaskItem> CreateTask(int projectId, TaskItem task);

        Task<TaskItem?> UpdateTask(int id, TaskItem task);

        Task<bool> DeleteTask(int id);
    }
}