using MediatR;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Services.Handlers.Holidays.Queries;
using Scheduler.Services.Handlers.Pto.Schedule.Queries;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Scheduler.API.Controllers;

[Route("[controller]")]
[ApiController]
public class HolidaysController : ControllerBase
{
    public IMediator _mediator { get; }

    public HolidaysController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // GET: api/<HolidaysController>
    [HttpGet("all-holidays")]
    public async Task<ActionResult> GetAllHolidays()
    {
        return Ok(await _mediator.Send(new GetHolidaysListRequest()));
    }

    // GET: api/<HolidaysController>
    [HttpGet("all-holiday-dates")]
    public async Task<ActionResult> GetAllHolidayDates()
    {
        return Ok(await _mediator.Send(new GetHolidayDatesRequest()));
    }

    // GET: api/<HolidaysController>
    /// <summary>
    /// Pretending that HolidayDates come from outside database source to 
    /// make a repo with interface example
    /// </summary>
    [HttpGet("all-holiday-dates-from-repo/{yearId}")]
    public async Task<ActionResult> GetAllHolidayDatesFromRepo(int yearId)
    {
        return Ok(await _mediator.Send(new GetHoldayDatesFromRepoRequest(yearId)));
    }

    // GET api/<HolidaysController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

    // POST api/<HolidaysController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<HolidaysController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<HolidaysController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
