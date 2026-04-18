using TaskBoard.Api.Models;

namespace TaskBoard.Api.Services.Interfaces
{
    public interface IProjectService
    {
        Task<List<Project>> GetAllProjects();
        Task<Project?> GetProjectById(int id);
        Task<Project> CreateProject(Project project);
        Task<Project?> UpdateProject(int id, Project project);
        Task<bool> DeleteProject(int id);
    }
}