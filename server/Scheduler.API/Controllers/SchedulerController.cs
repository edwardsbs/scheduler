using MediatR;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Services.Handlers.Scheduler.Queries;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Scheduler.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SchedulerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SchedulerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/<SchedulerController>
        [HttpGet("years")]
        public async Task<ActionResult> GetYears()
        {
            return Ok(await _mediator.Send(new GetYearsRequest()));
        }

        // GET api/<SchedulerController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SchedulerController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SchedulerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SchedulerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
