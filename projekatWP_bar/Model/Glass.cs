using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace projekatWP_bar.Model{
    [Table("Glass")]
    public class Glass{
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("Position")]
        public int Position { get; set; }
        [Column("DrinkName")]
        [MaxLength(255)]
        public string DrinkName { get; set; }
        [Column("Price")]
        public int Price { get; set; }
        [Column("Color")]
        public string Color { get; set; }

        [JsonIgnore]
        public Order Order { get; set; }
    }
}