using System.ComponentModel.DataAnnotations;

namespace APIClients.Entities
{
    public class Clients
    {
        public Guid Id { get; set; }
        [StringLength(100, ErrorMessage = "The name must not exceed 100 characters")]
        [Required(ErrorMessage ="The Name is requiered")]
        public string Name { get; set; } = string.Empty;

        [StringLength(150, ErrorMessage = "The Direction must not exceed 150 characters")]
        [Required(ErrorMessage = "The Direction is requiered")]
        public string Direction { get; set; } = string.Empty;

        [StringLength(10, ErrorMessage = "The Phone Number must not exceed 10 characters")]
        [Required(ErrorMessage = "The Phone Number is requiered")]
        public string PhoneNumber { get; set; } = string.Empty;

        public Double Latitude { get; set; }
        public Double Longitude { get; set; }
        public Boolean IsDeleted { get; set; } = false;
    }
}
