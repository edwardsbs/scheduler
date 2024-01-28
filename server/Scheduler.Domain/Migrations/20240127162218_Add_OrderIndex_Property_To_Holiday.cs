using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scheduler.Domain.Migrations
{
    /// <inheritdoc />
    public partial class Add_OrderIndex_Property_To_Holiday : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderIndex",
                schema: "scheduler",
                table: "Holiday",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 1,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 2,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 3,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 4,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 5,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 6,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 7,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 8,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 9,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 10,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 11,
                column: "OrderIndex",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "scheduler",
                table: "Holiday",
                keyColumn: "HolidayId",
                keyValue: 12,
                column: "OrderIndex",
                value: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderIndex",
                schema: "scheduler",
                table: "Holiday");
        }
    }
}
