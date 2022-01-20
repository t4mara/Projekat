using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Dostavljaci")]

    public class Dostavljaci
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(20)]
        public string Ime { get; set; }

        public virtual List<Dostave> Dostave { get; set; } 

    }
}