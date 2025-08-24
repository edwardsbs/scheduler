using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Services.Handlers.Repositories.Holidays;

public interface IHolidaysForYearRepo
{
    public Task<List<HolidayDateRepoViewModel>> GetHolidaysForYear(int year, CancellationToken token);
}
public class HolidaysForYearRepo : IHolidaysForYearRepo
{
    private readonly IConfiguration _config;

    public HolidaysForYearRepo(IConfiguration config)
    {
        _config = config;
    }

    public async Task<List<HolidayDateRepoViewModel>> GetHolidaysForYear(int year, CancellationToken token)
    {
        var sql = @"
            SELECT 
	            HolidayDateId
	            , HolidayName
	            , ObserveDate
	            , Note
	            , YearId
	            , YearNumber
	            , h.HolidayId
                , h.OrderIndex
            FROM (SELECT * FROM scheduler.Holiday WHERE IsPlantObserved = 1) h
            LEFT JOIN (SELECT hd1.*, y.YearNumber
	            FROM scheduler.HolidayDate hd1
	            INNER JOIN scheduler.[Year] y
	            ON hd1.YearId = y.YearId 
	            WHERE y.YearNumber=@Year) hd
            ON h.HolidayId = hd.HolidayId            
        ";

        var connString = _config["SchedulerDB"];
        var connection = new SqlConnection(connString);

        var holidays = await connection.QueryAsync<HolidayDateRepoViewModel>(
            sql,
            new { Year = year }
            );

        return holidays
            .OrderBy(h => h.OrderIndex)
            .ThenBy(h => h.ObserveDate)
            .ThenBy(h => h.HolidayId)
            .ToList();
    }
}
