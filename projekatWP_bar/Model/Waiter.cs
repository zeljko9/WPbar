using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace projekatWP_bar.Model{
  [Table("Waiter")]
  public class Waiter{
      [Key]
      [Column("ID")]
      public int ID { get; set; }

      [Column("name")]
      public string name { get; set; }

      [Column("num_order")]
      public int num_order { get; set; }

      [Column("arrive_time")]
      public string arrive_time { get; set; }  

      public List<Order> Orders { get; set; }  

      [JsonIgnore]
      public Bar Bar { get; set; }
  }
}