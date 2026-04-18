using System.ComponentModel.DataAnnotations;
using System.Data;



namespace TaskBoard.Api.Models
{
    public class Project
    {
        public int Id {get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(300)]
        public string? Description {get; set; }

        public DateTime CreatedAt {get; set; } = DateTime.UtcNow;


        // Naviagetion property
        public List<TaskItem> Tasks {get; set; } = new();
    }
}