using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.Models;
using TaskBoard.Api.Services.Interfaces;

namespace TaskBoard.Api.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;

        // inject DbContext
        public ProjectService(AppDbContext context)
        {
            _context = context;
        }

        // GET all projects
        public async Task<List<Project>> GetAllProjects()
        {
            return await _context.Projects
                .Include(p => p.Tasks)
                .ToListAsync();
        }

        // GET project by id
        public async Task<Project?> GetProjectById(int id)
        {
            return await _context.Projects
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        // CREATE project
        public async Task<Project> CreateProject(Project project)
        {
            var exists = await _context.Projects
                .AnyAsync(p => p.Name == project.Name);

            if (exists)
                throw new Exception("Project name already exists");

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return project;
        }

        // UPDATE project
        public async Task<Project?> UpdateProject(int id, Project updatedProject)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null) return null;

            project.Name = updatedProject.Name;
            project.Description = updatedProject.Description;

            await _context.SaveChangesAsync();

            return project;
        }

        // DELETE project
        public async Task<bool> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null) return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}