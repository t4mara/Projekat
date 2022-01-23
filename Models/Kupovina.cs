using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace Models
{
    [Table("Kupovina")]
    public class Kupovina
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(20)]
        public string ImeKupca { get; set; }
        public DateTime Datum { get; set; }

        [Range(1,10000)]
        public int BrojKupljenogCveca { get; set; }
        
        [Range(1,10000000)]
        public double PotrosenNovac { get; set; }

        public Cvecare Cvecare {get; set;}
        

    }
}