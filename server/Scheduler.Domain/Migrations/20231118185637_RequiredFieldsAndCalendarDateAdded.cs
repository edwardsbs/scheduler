using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scheduler.Domain.Migrations
{
    /// <inheritdoc />
    public partial class RequiredFieldsAndCalendarDateAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<DateTime>(
                name: "CalendarDate",
                schema: "scheduler",
                table: "HolidayDate",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                schema: "scheduler",
                table: "Holidays",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HolidayDate_Holidays_HolidayId",
                schema: "scheduler",
                table: "HolidayDate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Holidays",
                schema: "scheduler",
                table: "Holidays");

            migrationBuilder.DropColumn(
                name: "CalendarDate",
                schema: "scheduler",
                table: "HolidayDate");

            migrationBuilder.RenameTable(
                name: "Holidays",
                schema: "scheduler",
                newName: "Holiday",
                newSchema: "scheduler");

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                schema: "scheduler",
                table: "Holiday",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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
    }
}
