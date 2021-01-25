using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projekatWP_bar.Model{
  [Table("Bar")]

  public class Bar{
      [Key]
      [Column("ID")]
      public int ID { get; set; }

      [Column("waiters_names")]
      public string waiters_names { get; set; }

      [Column("num")]
      public int num { get; set; }  

      public List<Waiter> Waiters { get; set; }  
  }
}