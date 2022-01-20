using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models {
    [Table("Cvecare")]
    public class Cvecare{
        [Key]
        public int ID { get; set; }

        public string Ime { get; set; }

        public string Grad { get; set; }
        public Menadzer Menadzer { get; set; }

        public int BrojCveca { get; set; }


        public virtual List<Zaposleni> Zaposleni { get; set; }   
        
        public virtual List<Dostave> Dostave { get; set; }

    }
}