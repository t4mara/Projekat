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
                name: "Menadzer",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JMBG = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: true),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Broj = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    CvecaraID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menadzer", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Menadzer_Cvecare_CvecaraID",
                        column: x => x.CvecaraID,
                        principalTable: "Cvecare",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_Menadzer_CvecaraID",
                table: "Menadzer",
                column: "CvecaraID",
                unique: true);

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
                name: "Menadzer");

            migrationBuilder.DropTable(
                name: "Zaposleni");

            migrationBuilder.DropTable(
                name: "Dostavljaci");

            migrationBuilder.DropTable(
                name: "Cvecare");
        }
    }
}
