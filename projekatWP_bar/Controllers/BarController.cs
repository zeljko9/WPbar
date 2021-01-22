using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using projekatWP_bar.Model;

namespace projekatWP_bar.Controller{
    [ApiController]
    [Route("[controller]")]

    public class BarController: ControllerBase{

        public BarContext Context { get; set; }

        public BarController(BarContext context){
             Context=context;
        }

        [Route("GetOrders")]
        [HttpGet]
        public async Task<List<Order>> GetBars(){
            return await Context.Orders.Include(p=>p.Glasses).ToListAsync();
        } 

        [Route("PostOrder")]
        [HttpPost]
        public async Task PostOrder([FromBody] Order order){
            Context.Orders.Add(order);
            await Context.SaveChangesAsync();
        }

        [Route("ChangeOrder")]
        [HttpPut]
        public async Task ChangeOrder([FromBody] Order order){
            Context.Update<Order>(order);
            await Context.SaveChangesAsync();
        }

        [Route("DeleteOrder/{id}")]
        [HttpDelete]
        public async Task DeleteOrder(int id){
            var order=await Context.Orders.FindAsync(id);
            Context.Remove(order);
            await Context.SaveChangesAsync();
        }

        [Route("PostGlass/{idOrder}/{idGlass}")]
        [HttpPost]
        public async Task PostGlass(int idOrder,int idGlass,[FromBody]Glass glass){
            var order=await Context.Orders.FindAsync(idOrder);
            glass.Order=order;

            order.Glasses[idOrder-1]=glass;

            Context.Update<Order>(order);
            await Context.SaveChangesAsync();
        }
    }
}