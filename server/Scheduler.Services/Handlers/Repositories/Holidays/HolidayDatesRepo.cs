using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Scheduler.Services.Handlers.Repositories.Holidays;

/// <summary>
/// Pretending that HolidayDates come from outside database source to 
/// make a repo with interface and utilizing Dapper example
/// </summary>

public interface IHolidaysRepo
{
    Task<List<HoldayDateRepoViewModel>> GetHolidayDates(int yearId, CancellationToken token);
}

public class HolidaysRepo : IHolidaysRepo
{
    private readonly IConfiguration _config;

    public HolidaysRepo(IConfiguration config)
    {
        _config = config;
    }
    public async Task<List<HoldayDateRepoViewModel>> GetHolidayDates(int yearId, CancellationToken token)
    {
        var sql = @"SELECT * 
                    FROM scheduler.HolidayDate 
                    WHERE YearId=@YearId";

        var connString = _config["ConnectionString:SchedulerDB"];
        //using (var connection = new SqlConnection(connString))
        //{
        //    products = connection.Query<Holiday>(sql).ToList();
        //}

        var connection = new SqlConnection(connString);

        var holidays = await connection.QueryAsync<HoldayDateRepoViewModel>(sql, new { YearId = yearId });

        return holidays.ToList();

    }
}
