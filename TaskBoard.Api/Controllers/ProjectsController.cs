using Microsoft.AspNetCore.Mvc;
using TaskBoard.Api.Models;
using TaskBoard.Api.Services.Interfaces;

namespace TaskBoard.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        // inject service instead of DbContext
        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

       
        // GET: /api/projects
      
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _projectService.GetAllProjects();
            return Ok(projects);
        }

        
        // GET: /api/projects/{id}
       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _projectService.GetProjectById(id);

            if (project == null)
                return NotFound();

            return Ok(project);
        }

        
        // POST: /api/projects
    
        [HttpPost]
        public async Task<IActionResult> CreateProject(Project project)
        {
            try
            {
                var created = await _projectService.CreateProject(project);

                return CreatedAtAction(nameof(GetProject), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

       
        // PUT: /api/projects/{id}
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, Project project)
        {
            var updated = await _projectService.UpdateProject(id, project);

            if (updated == null)
                return NotFound();

            return Ok(updated);
        }

      
        // DELETE: /api/projects/{id}
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var deleted = await _projectService.DeleteProject(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}