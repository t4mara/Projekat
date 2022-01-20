using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Zaposleni")]

    public class Zaposleni
    {
        
        [Key]
        public int ID { get; set; }

        public string JMBG { get; set; }

        public string Ime { get; set; }

        public string Prezime { get; set; }

        public string Grad { get; set; }

        public Cvecare Cvecare {get; set;}

    }
}