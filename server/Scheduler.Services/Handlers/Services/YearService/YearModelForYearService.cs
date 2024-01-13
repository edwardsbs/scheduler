using Scheduler.Services.Handlers.Contracts;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Scheduler.Domain.Models;

namespace Scheduler.Services.Handlers.Services.YearService;

public interface IYearModelForYearService
{
    public Task<Year> GetYearModel(int year, CancellationToken token);
}

public class YearModelForYearService : IYearModelForYearService
{
    private readonly ISchedulerContext _context;

    public YearModelForYearService(ISchedulerContext context)
    {
        _context = context;
    }

    public async Task<Year> GetYearModel(int year, CancellationToken token)
    {
        //var result = new YearDto();

        var yr = await _context.Year
            .FirstOrDefaultAsync(x => x.YearNumber == year, token);

        //var config = new MapperConfiguration(cfg => cfg.CreateMap<Year, YearDto>());

        //var mapper = new Mapper(config);

        //var annualVM = mapper.Map<YearDto>(yr);

        return yr;
    }
}
