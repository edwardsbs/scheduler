using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Services.PtoAnnualForYear;
using Scheduler.Services.Handlers.Services.YearService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Services.Handlers.Holidays.Commands;

public record AddHolidayDateRequest(
    int HolidayId,
    DateTime HolidayDate
    ) : IRequest<HolidayDate>;

public class AddHolidayDateHandler : IRequestHandler<AddHolidayDateRequest, HolidayDate>
{
    private readonly ISchedulerContext _context;
    private readonly IYearModelForYearService _yearService;

    public AddHolidayDateHandler(ISchedulerContext context, IYearModelForYearService yearService)
    {
        _context = context;
        _yearService = yearService;
    }

    public async Task<HolidayDate> Handle(AddHolidayDateRequest request, CancellationToken token)
    {

        var yearId = 0;
        var year = await _yearService.GetYearModel(request.HolidayDate.Year, token);

        if (year != null) yearId = year.YearId;

        try
        {
            var hol = HolidayDate.Create(request.HolidayDate, yearId, request.HolidayId);

            await _context.AddAsync(hol);

            await _context.SaveChangesAsync(token);

            var newRecord = await _context.HolidayDate
                .FirstOrDefaultAsync(x => x.ObserveDate == request.HolidayDate && x.YearId == yearId);

            return newRecord;
        }
        catch (Exception ex)
        {
            throw new ArgumentException("Error Adding Holiday Observe Date Entry.");
        }

        //return Unit.Value;
    }
}
