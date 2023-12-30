using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scheduler.Domain.Migrations
{
    /// <inheritdoc />
    public partial class Add_CompTimeHours_And_NonNullable_To_PtoAnnual : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "PurchasedHours",
                schema: "scheduler",
                table: "PtoAnnual",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "FloatingHours",
                schema: "scheduler",
                table: "PtoAnnual",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "CarriedOverHours",
                schema: "scheduler",
                table: "PtoAnnual",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);

            migrationBuilder.AddColumn<float>(
                name: "CompTimeHours",
                schema: "scheduler",
                table: "PtoAnnual",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompTimeHours",
                schema: "scheduler",
                table: "PtoAnnual");

            migrationBuilder.AlterColumn<float>(
                name: "PurchasedHours",
                schema: "scheduler",
                table: "PtoAnnual",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<float>(
                name: "FloatingHours",
                schema: "scheduler",
                table: "PtoAnnual",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<float>(
                name: "CarriedOverHours",
                schema: "scheduler",
                table: "PtoAnnual",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
