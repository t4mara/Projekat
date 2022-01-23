using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cvecare",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    BrojCveca = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cvecare", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Dostavljaci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dostavljaci", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kupovina",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImeKupca = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Datum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BrojKupljenogCveca = table.Column<int>(type: "int", nullable: false),
                    PotrosenNovac = table.Column<double>(type: "float", nullable: false),
                    CvecareID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kupovina", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Kupovina_Cvecare_CvecareID",
                        column: x => x.CvecareID,
                        principalTable: "Cvecare",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Zaposleni",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JMBG = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: true),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CvecareID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zaposleni", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Zaposleni_Cvecare_CvecareID",
                        column: x => x.CvecareID,
                        principalTable: "Cvecare",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Dostave",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DostavljaciID = table.Column<int>(type: "int", nullable: false),
                    CvecareID = table.Column<int>(type: "int", nullable: false),
                    BrojCveca = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dostave", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Dostave_Cvecare_CvecareID",
                        column: x => x.CvecareID,
                        principalTable: "Cvecare",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Dostave_Dostavljaci_DostavljaciID",
                        column: x => x.DostavljaciID,
                        principalTable: "Dostavljaci",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dostave_CvecareID",
                table: "Dostave",
                column: "CvecareID");

            migrationBuilder.CreateIndex(
                name: "IX_Dostave_DostavljaciID",
                table: "Dostave",
                column: "DostavljaciID");

            migrationBuilder.CreateIndex(
                name: "IX_Kupovina_CvecareID",
                table: "Kupovina",
                column: "CvecareID");

            migrationBuilder.CreateIndex(
                name: "IX_Zaposleni_CvecareID",
                table: "Zaposleni",
                column: "CvecareID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dostave");

            migrationBuilder.DropTable(
                name: "Kupovina");

            migrationBuilder.DropTable(
                name: "Zaposleni");

            migrationBuilder.DropTable(
                name: "Dostavljaci");

            migrationBuilder.DropTable(
                name: "Cvecare");
        }
    }
}
