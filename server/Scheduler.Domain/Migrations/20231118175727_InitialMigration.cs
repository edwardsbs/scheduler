using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Scheduler.Domain.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "scheduler");

            migrationBuilder.CreateTable(
                name: "Holiday",
                schema: "scheduler",
                columns: table => new
                {
                    HolidayId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HolidayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsPlantObserved = table.Column<bool>(type: "bit", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Holiday", x => x.HolidayId);
                });

            migrationBuilder.CreateTable(
                name: "Year",
                schema: "scheduler",
                columns: table => new
                {
                    YearId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    YearNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Year", x => x.YearId);
                });

            migrationBuilder.CreateTable(
                name: "HolidayDate",
                schema: "scheduler",
                columns: table => new
                {
                    HolidayDateId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HolidayId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HolidayDate", x => x.HolidayDateId);
                    table.ForeignKey(
                        name: "FK_HolidayDate_Holiday_HolidayId",
                        column: x => x.HolidayId,
                        principalSchema: "scheduler",
                        principalTable: "Holiday",
                        principalColumn: "HolidayId");
                });

            migrationBuilder.InsertData(
                schema: "scheduler",
                table: "Holiday",
                columns: new[] { "HolidayId", "HolidayName", "IsPlantObserved", "Note" },
                values: new object[,]
                {
                    { 1, "New Years Day", true, "celebrated on the anniversary date, January 1" },
                    { 2, "Martin Luther King Jr. Birthday", false, "observed on the third Monday of January" },
                    { 3, "Presidents Day", false, "observed on the third Monday of each February " },
                    { 4, "Memorial Day", true, "observed on the last Monday of May" },
                    { 5, "Independence Day", true, "celebrated on the anniversary date, July 4" },
                    { 6, "Labor Day", true, "observed on the first Monday of each September " },
                    { 7, "Veterans Day", true, "celebrated on the anniversary date, November 11" },
                    { 8, "Indigenous Peoples’ Day", false, "celebrated on the second Monday of each October " },
                    { 9, "Thanksgiving Day", true, "celebrated on the fourth Thursday of each November" },
                    { 10, "Thanksgiving Holiday", true, "observed on the day after Thanksgiving" },
                    { 11, "Christmas Eve", true, "celebrated on the anniversary date, December 24" },
                    { 12, "Christmas Day", true, "celebrated on the anniversary date, December 25" }
                });

            migrationBuilder.InsertData(
                schema: "scheduler",
                table: "Year",
                columns: new[] { "YearId", "YearNumber" },
                values: new object[,]
                {
                    { 1, 2022 },
                    { 2, 2023 },
                    { 3, 2024 },
                    { 4, 2025 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_HolidayDate_HolidayId",
                schema: "scheduler",
                table: "HolidayDate",
                column: "HolidayId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HolidayDate",
                schema: "scheduler");

            migrationBuilder.DropTable(
                name: "Year",
                schema: "scheduler");

            migrationBuilder.DropTable(
                name: "Holiday",
                schema: "scheduler");
        }
    }
}
