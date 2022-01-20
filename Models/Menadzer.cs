using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Menadzer")]
    public class Menadzer
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(13)]
        public string JMBG { get; set; }
        [MaxLength(20)]
        public string Ime { get; set; }
        [MaxLength(20)]
        public string Prezime { get; set; }
        public string Email { get; set; }
        [MaxLength(10)]
        public string Broj { get; set; }

        public int CvecaraID { get; set; }
        public Cvecare Cvecare {get; set;}
        

    }
}