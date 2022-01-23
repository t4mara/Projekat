using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models {
    [Table("Cvecare")]
    public class Cvecare{
        [Key]
        public int ID { get; set; }

        [MaxLength(20)]
        public string Ime { get; set; }
        
        [MaxLength(20)]
        public string Grad { get; set; }
        public virtual List<Kupovina> Kupovina { get; set; }

        [Range(1,10000)]
        public int BrojCveca { get; set; }


        public virtual List<Zaposleni> Zaposleni { get; set; }   
        
        public virtual List<Dostave> Dostave { get; set; }

    }
}