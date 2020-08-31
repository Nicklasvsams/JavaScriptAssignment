namespace JavaScriptAssignment.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ContactModel
    {
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Message { get; set; }

        [Phone]
        public string Phone { get; set; }
    }
}
