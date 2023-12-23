using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scheduler.Domain.Migrations
{
    /// <inheritdoc />
    public partial class Add_PtoAnnual_And_PtoSchedule_Tables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PtoAnnual",
                schema: "scheduler",
                columns: table => new
                {
                    PtoAnnualId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PtoHours = table.Column<float>(type: "real", nullable: false),
                    CarriedOverHours = table.Column<float>(type: "real", nullable: true),
                    PurchasedHours = table.Column<float>(type: "real", nullable: true),
                    FloatingHours = table.Column<float>(type: "real", nullable: true),
                    PtoDays = table.Column<float>(type: "real", nullable: true),
                    YearId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PtoAnnual", x => x.PtoAnnualId);
                    table.ForeignKey(
                        name: "FK_PtoAnnual_Year_YearId",
                        column: x => x.YearId,
                        principalSchema: "scheduler",
                        principalTable: "Year",
                        principalColumn: "YearId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PtoSchedule",
                schema: "scheduler",
                columns: table => new
                {
                    PtoScheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Hours = table.Column<float>(type: "real", nullable: false),
                    IsScheduled = table.Column<bool>(type: "bit", nullable: false),
                    IsTaken = table.Column<bool>(type: "bit", nullable: false),
                    PtoAnnualId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PtoSchedule", x => x.PtoScheduleId);
                    table.ForeignKey(
                        name: "FK_PtoSchedule_PtoAnnual_PtoAnnualId",
                        column: x => x.PtoAnnualId,
                        principalSchema: "scheduler",
                        principalTable: "PtoAnnual",
                        principalColumn: "PtoAnnualId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PtoAnnual_YearId",
                schema: "scheduler",
                table: "PtoAnnual",
                column: "YearId");

            migrationBuilder.CreateIndex(
                name: "IX_PtoSchedule_PtoAnnualId",
                schema: "scheduler",
                table: "PtoSchedule",
                column: "PtoAnnualId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PtoSchedule",
                schema: "scheduler");

            migrationBuilder.DropTable(
                name: "PtoAnnual",
                schema: "scheduler");
        }
    }
}
