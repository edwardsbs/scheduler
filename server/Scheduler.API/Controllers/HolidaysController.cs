using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Holidays.Commands;
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

    [HttpGet("all-holiday-dates/{year}")]
    public async Task<ActionResult> GetAllHolidayDatesForYear(int year)
    {
        return Ok(await _mediator.Send(new GetHolidaysForYearRequest(year)));
    }

    // GET: api/<HolidaysController>
    /// <summary>
    /// Pretending that HolidayDates come from outside database source to 
    /// make a repo with interface example
    /// </summary>
    [HttpGet("all-holiday-dates-from-repo/{yearId}")]
    public async Task<ActionResult> GetAllHolidayDatesFromRepo(int yearId)
    {
        return Ok(await _mediator.Send(new GetHolidayDatesFromRepoRequest(yearId)));
    }

    // GET api/<HolidaysController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

    // POST api/<HolidaysController>
    [HttpPost("add-holiday-date")]
    public async Task<ActionResult> AddHolidayDate([FromBody] AddHolidayDateRequest request, CancellationToken token)
    {
        return Ok(await _mediator.Send(request, token));
    }

    // PUT api/<HolidaysController>/5
    [HttpPut("edit-holiday-date")]
    public async Task<ActionResult> EditHolidayDate([FromBody] EditHolidayDateRequest request, CancellationToken token)
    {
        return Ok(await _mediator.Send(request, token));
    }

    // DELETE api/<HolidaysController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
