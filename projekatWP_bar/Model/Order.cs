using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projekatWP_bar.Model{
    [Table("Order")]
    public class Order{
        [Key]
        [Column("ID")]
        public int ID{get; set;}
        [Column("Price")]
        public int Price{get; set;}
        [Column("Num_glass")]
        public int Num_glass { get; set; }
        public List<Glass> Glasses { get; set; }           
    }
}