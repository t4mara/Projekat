using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Zaposleni")]

    public class Zaposleni
    {
        
        [Key]
        public int ID { get; set; }
        [MaxLength(13)]
        public string JMBG { get; set; }
        [MaxLength(20)]
        public string Ime { get; set; }
        [MaxLength(20)]

        public string Prezime { get; set; }

        [MaxLength(20)]
        public string Grad { get; set; }

        public Cvecare Cvecare {get; set;}

    }
}