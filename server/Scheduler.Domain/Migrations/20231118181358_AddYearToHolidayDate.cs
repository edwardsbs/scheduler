using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scheduler.Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddYearToHolidayDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "YearId",
                schema: "scheduler",
                table: "HolidayDate",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_HolidayDate_YearId",
                schema: "scheduler",
                table: "HolidayDate",
                column: "YearId");

            migrationBuilder.AddForeignKey(
                name: "FK_HolidayDate_Year_YearId",
                schema: "scheduler",
                table: "HolidayDate",
                column: "YearId",
                principalSchema: "scheduler",
                principalTable: "Year",
                principalColumn: "YearId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HolidayDate_Year_YearId",
                schema: "scheduler",
                table: "HolidayDate");

            migrationBuilder.DropIndex(
                name: "IX_HolidayDate_YearId",
                schema: "scheduler",
                table: "HolidayDate");

            migrationBuilder.DropColumn(
                name: "YearId",
                schema: "scheduler",
                table: "HolidayDate");
        }
    }
}
