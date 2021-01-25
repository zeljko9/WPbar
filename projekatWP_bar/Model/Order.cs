using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace projekatWP_bar.Model{
    [Table("Order")]
    public class Order{
        [Key]
        [Column("ID")]
        public int ID{get; set;}

        [Column("finall_price")]
        public int finall_price{get; set;}

        [Column("Num_glass")]
        public int Num_glass { get; set; }

        [Column("order_time")]
        public string order_time { get; set; }

        public List<Glass> Glasses { get; set; }  
        
        [JsonIgnore]
        public Waiter Waiter { get; set; }        
    }
}