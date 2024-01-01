using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Pto.Schedule.Queries;
using Scheduler.Services.Handlers.Pto.Schedule.Commands;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Scheduler.API.Controllers;

[Route("[controller]")]
[ApiController]
public class PtoController : ControllerBase
{
    private readonly IMediator _mediator;

    public PtoController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // GET: api/<PtoController>
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //    return new string[] { "value1", "value2" };
    //}
           

    // GET api/<PtoController>/5
    [HttpGet("{id}")]
    public async Task<ActionResult> GetPtoScheduleByPtoAnnualId(int id)
    {
        return Ok(await _mediator.Send(new GetPtoScheduleByPtoAnnulRequest(id)));
    }

    [HttpGet("year/{year}")]
    public async Task<ActionResult> GetPtoScheduleByYear(int year)
    {
        return Ok(await _mediator.Send(new GetPtoScheduleForYearRequest(year)));
    }

    [HttpGet("pto-annual/{year}")]
    public async Task<ActionResult> GetPtoAnnualForYear(int year)
    {
        return Ok(await _mediator.Send(new GetPtoAnnualForYearRequest(year)));
    }

    //// GET api/<PtoController>/5
    //[HttpGet("{id}")]
    //public string GetPtoScheduleByYearId(int id)
    //{
    //    return "value";
    //}

    //// GET api/<PtoController>/5
    //[HttpGet("{id}")]
    //public string Get(int id)
    //{
    //    return "value";
    //}

    //// POST api/<PtoController>
    [HttpPost("add-pto")]
    public async Task<ActionResult> AddPto([FromBody] AddPtoRequest request, CancellationToken token)
    {
        return Ok(await _mediator.Send(request, token));
    }

    [HttpPut("edit-pto")]
    public async Task<ActionResult> EditPto([FromBody] EditPtoRequest request, CancellationToken token)
    {
        return Ok(await _mediator.Send(request, token));
    }

    //// PUT api/<PtoController>/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //// DELETE api/<PtoController>/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
}
