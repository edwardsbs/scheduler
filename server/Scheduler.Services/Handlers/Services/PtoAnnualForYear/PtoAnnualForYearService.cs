using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;

namespace Scheduler.Services.Handlers.Services.PtoAnnualForYear;

public interface IPtoAnnualForYearService
{
    public Task<PtoAnnualViewModel> GetPtoAnnual(int year, CancellationToken token);
}
class PtoAnnualForYearService : IPtoAnnualForYearService
{
    private readonly ISchedulerContext _context;

    public PtoAnnualForYearService(ISchedulerContext context)
    {
        _context = context;
    }

    public async Task<PtoAnnualViewModel> GetPtoAnnual(int year, CancellationToken token)
    {
        var result = new PtoAnnualViewModel();

        var annualResults = await _context.PtoAnnual
            .Include(x => x.Year)
            .FirstOrDefaultAsync(x => x.Year.YearNumber == year, token);

        if (annualResults != null)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<PtoAnnual, PtoAnnualViewModel>()
           .ForMember(x => x.Year, opt =>
               opt.MapFrom(src => src.Year.YearNumber))
           .ForMember(x => x.TotalPtoHours, opt =>
               opt.MapFrom(src => (src.PtoHours + src.CarriedOverHours + src.CompTimeHours + src.PurchasedHours + src.FloatingHours)))
           );

            var mapper = new Mapper(config);

            var annualVM = mapper.Map<PtoAnnualViewModel>(annualResults);

            result = annualVM;
        }

        return result;

    }
}
