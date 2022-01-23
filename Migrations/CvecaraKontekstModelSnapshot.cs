﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace Projekat.Migrations
{
    [DbContext(typeof(CvecaraKontekst))]
    partial class CvecaraKontekstModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Models.Cvecare", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("BrojCveca")
                        .HasColumnType("int");

                    b.Property<string>("Grad")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Ime")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("ID");

                    b.ToTable("Cvecare");
                });

            modelBuilder.Entity("Models.Dostave", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("BrojCveca")
                        .HasColumnType("int");

                    b.Property<int>("CvecareID")
                        .HasColumnType("int");

                    b.Property<int>("DostavljaciID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("CvecareID");

                    b.HasIndex("DostavljaciID");

                    b.ToTable("Dostave");
                });

            modelBuilder.Entity("Models.Dostavljaci", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Ime")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("ID");

                    b.ToTable("Dostavljaci");
                });

            modelBuilder.Entity("Models.Kupovina", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("BrojKupljenogCveca")
                        .HasColumnType("int");

                    b.Property<int?>("CvecareID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImeKupca")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<double>("PotrosenNovac")
                        .HasColumnType("float");

                    b.HasKey("ID");

                    b.HasIndex("CvecareID");

                    b.ToTable("Kupovina");
                });

            modelBuilder.Entity("Models.Zaposleni", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("CvecareID")
                        .HasColumnType("int");

                    b.Property<string>("Grad")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Ime")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("JMBG")
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)");

                    b.Property<string>("Prezime")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("ID");

                    b.HasIndex("CvecareID");

                    b.ToTable("Zaposleni");
                });

            modelBuilder.Entity("Models.Dostave", b =>
                {
                    b.HasOne("Models.Cvecare", "Cvecare")
                        .WithMany("Dostave")
                        .HasForeignKey("CvecareID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.Dostavljaci", "Dostavljaci")
                        .WithMany("Dostave")
                        .HasForeignKey("DostavljaciID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cvecare");

                    b.Navigation("Dostavljaci");
                });

            modelBuilder.Entity("Models.Kupovina", b =>
                {
                    b.HasOne("Models.Cvecare", "Cvecare")
                        .WithMany("Kupovina")
                        .HasForeignKey("CvecareID");

                    b.Navigation("Cvecare");
                });

            modelBuilder.Entity("Models.Zaposleni", b =>
                {
                    b.HasOne("Models.Cvecare", "Cvecare")
                        .WithMany("Zaposleni")
                        .HasForeignKey("CvecareID");

                    b.Navigation("Cvecare");
                });

            modelBuilder.Entity("Models.Cvecare", b =>
                {
                    b.Navigation("Dostave");

                    b.Navigation("Kupovina");

                    b.Navigation("Zaposleni");
                });

            modelBuilder.Entity("Models.Dostavljaci", b =>
                {
                    b.Navigation("Dostave");
                });
#pragma warning restore 612, 618
        }
    }
}
