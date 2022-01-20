using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Dostave")]
    public class Dostave
    {      
        [Key]
        public int ID { get; set; }

[Required]
        public Dostavljaci Dostavljaci { get; set; }

[Required]
        public Cvecare Cvecare { get; set; }


        public int BrojCveca { get; set; }
    }
}