using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scheduler.Domain.Migrations
{
    /// <inheritdoc />
    public partial class Change_CalendarDate_To_ObsereveDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HolidayDate_Holidays_HolidayId",
                schema: "scheduler",
                table: "HolidayDate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Holidays",
                schema: "scheduler",
                table: "Holidays");

            migrationBuilder.RenameTable(
                name: "Holidays",
                schema: "scheduler",
                newName: "Holiday",
                newSchema: "scheduler");

            migrationBuilder.RenameColumn(
                name: "CalendarDate",
                schema: "scheduler",
                table: "HolidayDate",
                newName: "ObserveDate");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Holiday",
                schema: "scheduler",
                table: "Holiday",
                column: "HolidayId");

            migrationBuilder.AddForeignKey(
                name: "FK_HolidayDate_Holiday_HolidayId",
                schema: "scheduler",
                table: "HolidayDate",
                column: "HolidayId",
                principalSchema: "scheduler",
                principalTable: "Holiday",
                principalColumn: "HolidayId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HolidayDate_Holiday_HolidayId",
                schema: "scheduler",
                table: "HolidayDate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Holiday",
                schema: "scheduler",
                table: "Holiday");

            migrationBuilder.RenameTable(
                name: "Holiday",
                schema: "scheduler",
                newName: "Holidays",
                newSchema: "scheduler");

            migrationBuilder.RenameColumn(
                name: "ObserveDate",
                schema: "scheduler",
                table: "HolidayDate",
                newName: "CalendarDate");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Holidays",
                schema: "scheduler",
                table: "Holidays",
                column: "HolidayId");

            migrationBuilder.AddForeignKey(
                name: "FK_HolidayDate_Holidays_HolidayId",
                schema: "scheduler",
                table: "HolidayDate",
                column: "HolidayId",
                principalSchema: "scheduler",
                principalTable: "Holidays",
                principalColumn: "HolidayId");
        }
    }
}
