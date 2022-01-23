using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;


namespace Models{
    public class CvecaraKontekst: DbContext{
        public CvecaraKontekst(DbContextOptions<CvecaraKontekst> options) : base(options) { }

        public DbSet<Cvecare> Cvecare { get; set; }
        public DbSet<Dostave> Dostave { get; set; }
        public DbSet<Dostavljaci> Dostavljaci { get; set; }
        public DbSet<Kupovina> Kupovina { get; set; }
        public DbSet<Zaposleni> Zaposleni { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cvecare>().HasMany<Zaposleni>(p => p.Zaposleni).WithOne(p => p.Cvecare);
            modelBuilder.Entity<Cvecare>().HasMany<Dostave>(p => p.Dostave).WithOne(p => p.Cvecare);

            modelBuilder.Entity<Cvecare>().HasMany<Kupovina>(p => p.Kupovina).WithOne(p => p.Cvecare);

            modelBuilder.Entity<Dostave>().HasOne<Dostavljaci>(p => p.Dostavljaci).WithMany(p => p.Dostave);
            base.OnModelCreating(modelBuilder);
        }
    }
}