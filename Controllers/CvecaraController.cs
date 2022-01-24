using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CvecaraController : ControllerBase
    {
        public CvecaraKontekst kontekst { get; set; }
        public CvecaraController(CvecaraKontekst context)
        {
            kontekst = context;
        }
/*
        private readonly ILogger<CvecaraController> _logger;

        public CvecaraController(ILogger<CvecaraController> logger)
        {
            _logger = logger;
        }
*/        
        #region Dobij
        [HttpGet]
        [Route("DobijCvecare")]
        public async Task<ActionResult> GetCvecara()
        {
            try
            {
                return Ok(await kontekst.Cvecare.Select(p =>
                new
                {
                    ID = p.ID,
                    Ime = p.Ime
                }).ToListAsync());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("DobijDostavljace")]
        public async Task<ActionResult> GetDostavljac()
        {
            try
            {
                return Ok(await kontekst.Dostavljaci.Select(p =>
                new
                {
                    Ime = p.Ime,
                    ID = p.ID

                }).ToListAsync());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);

                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("DobijDostave")]
        public async Task<ActionResult> GetDostave()
        {
            try
            {
                return Ok(await kontekst.Dostave.Select(p =>
                new
                {
                    Dostavljaci = p.Dostavljaci,
                    Cvecare = p.Cvecare,
                    BrojCveca = p.BrojCveca,
                    ID = p.ID
                }).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("DobijKupovine")]
        public async Task<ActionResult> GetKupovine()
        {
            try
            {
                return Ok(await kontekst.Kupovina.Select(p =>
                new
                {
                    ID = p.ID,
                    PotrosenNovac = p.PotrosenNovac,
                    Datum = p.Datum,
                    ImeKupca = p.ImeKupca,
                    BrojKupljenogCveca = p.BrojKupljenogCveca
                }).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("DobijZaposlene")]
        public async Task<ActionResult> GetZaposlen()
        {
            try
            {
                return Ok(await kontekst.Zaposleni.Select(p =>
                new
                {
                    JMBG = p.JMBG, 
                    ID = p.ID
                }).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion
        #region Dodavanje

        [Route("DodajCvecaru/{Ime}/{Grad}/{BrojCveca}")]
        [HttpPost]
        public async Task<ActionResult> DodajCvecaru (string Ime, string Grad, int BrojCveca){
            Cvecare cvecare = new Cvecare();
            cvecare.Ime = Ime;
            cvecare.Grad = Grad;
            cvecare.BrojCveca = BrojCveca;
            try
            {                           
            if (cvecare == null)
            {
                throw new ArgumentNullException(nameof(cvecare));
            }

            if (Ime.Length > 20 || Grad.Length > 20 || BrojCveca > 10000)
            {
                return BadRequest("Neprikladni argumenti");
            }
                kontekst.Cvecare.Add(cvecare);
                await kontekst.SaveChangesAsync();
                return Ok($"Dodata je cvecara {Ime}!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                return BadRequest(e.Message);
            }
         }

        [Route("DodajDostavljaca/{Ime}")]
        [HttpPost]
        public async Task<ActionResult> DodajDostavljaca (string Ime){
            Dostavljaci dostavljaci = new Dostavljaci();
            dostavljaci.Ime = Ime;

            if (dostavljaci is null)
            {
                throw new ArgumentNullException(nameof(dostavljaci));
            }
            if (Ime.Length > 20)
            {
                return BadRequest("Neprikladni argumenti");
            }
            try
            {
                kontekst.Dostavljaci.Add(dostavljaci);
                await kontekst.SaveChangesAsync();
                return Ok($"Dodat dostavljac {Ime}!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                return BadRequest(e.Message);
            }
         }

        [Route("DodajDostavu/{IDCvecare}/{IDDostavljaca}/{brojCveca}")]
        [HttpPost]
        public async Task<ActionResult> DodajDostavu (int IDCvecare, int IDDostavljaca, int brojCveca){
            try
            {
                var cvecara = await kontekst.Cvecare.FindAsync(IDCvecare);
                var dostavljac = await kontekst.Dostavljaci.FindAsync(IDDostavljaca);

            if (cvecara == null || dostavljac == null || brojCveca > 10000 || IDDostavljaca <= 0 || IDCvecare <= 0)
            {
                return BadRequest("Lose");
            }

                Dostave dostava = new Dostave();
                    dostava.Cvecare = cvecara;
                    dostava.Dostavljaci = dostavljac;
                    dostava.BrojCveca = brojCveca;

                kontekst.Dostave.Add(dostava);
                await kontekst.SaveChangesAsync();
                return Ok($"Dodata dostava!");
            }
            catch (Exception e)
            {
            Console.WriteLine(e.InnerException.Message);
               return BadRequest(e.Message);
            }
         }
        [Route("DodajKupovinu/{BrojKupljenogCveca}/{ImeKupca}/{Datum}/{PotrosenNovac}/{CvecaraID}")]
        [HttpPost]
        public async Task<ActionResult> DodajKupovinu (int BrojKupljenogCveca, string ImeKupca, DateTime Datum, double PotrosenNovac, int CvecaraID){
            Kupovina kupovina = new Kupovina();
            kupovina.BrojKupljenogCveca = BrojKupljenogCveca;
            kupovina.ImeKupca = ImeKupca;
            kupovina.Datum = Datum;
            kupovina.PotrosenNovac = PotrosenNovac;
            var cvecara = await kontekst.Cvecare.FindAsync(CvecaraID);
            kupovina.Cvecare = cvecara;

            if (ImeKupca.Length > 20 || PotrosenNovac > (double)10000000 || BrojKupljenogCveca > 10000 || cvecara == null || CvecaraID <= 0)
            {
                return BadRequest("Lose");
            }

            try
            {
                kontekst.Kupovina.Add(kupovina);
                await kontekst.SaveChangesAsync();
                return Ok($"Dodata kupovina od {PotrosenNovac} dinara!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                return BadRequest(e.Message);
            }
         }
        [Route("DodajZaposlenog/{IDCvecare}/{JMBG}/{Ime}/{Prezime}/{Grad}")]
        [HttpPost]
        public async Task<ActionResult> DodajZaposlenog (int IDCvecare, string JMBG, string Ime, string Prezime, string Grad){
            try
            {
            var cvecara = await kontekst.Cvecare.FindAsync(IDCvecare);
            if (cvecara == null){ return BadRequest("Cvecara je null!"); }
             if(Ime.Length > 20){ return BadRequest("Ime predugo!"); }
              if(Prezime.Length > 20){ return BadRequest("Prezime predugo!"); }
              if(Grad.Length > 20){ return BadRequest("Predug grad!"); }
              if (IDCvecare <= 0) {return BadRequest("Los ID cvecare!");}
             if(JMBG.Length != 13){ return BadRequest("JMBG los!");}
                Zaposleni zaposleni = new Zaposleni();
                    zaposleni.Cvecare = cvecara;
                    zaposleni.JMBG = JMBG;
                    zaposleni.Ime = Ime;
                    zaposleni.Prezime = Prezime;
                    zaposleni.Grad = Grad;
                kontekst.Zaposleni.Add(zaposleni);
                await kontekst.SaveChangesAsync();
                return Ok($"Dodat je zaposleni sa JMBG-om {JMBG}!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                return BadRequest(e.InnerException.Message);
            }
         }
         #endregion
        #region Promeni
        
        [Route("PromeniCvecaru/{ID}/{Ime}/{Grad}/{BrojCveca}")]
        [HttpPut]
        public async Task<ActionResult> PromeniCvecaru(int ID, string Ime, string Grad, int BrojCveca)
        {
            var cvecare = await kontekst.Cvecare.FindAsync(ID);

            if (cvecare == null || cvecare.ID <= 0)
            {
                return BadRequest("Ne postoji!");
            }

            if (Ime.Length > 20 || Grad.Length > 20 || BrojCveca > 10000)
            {
                return BadRequest("Neprikladni argumenti");
            }

            // ... Ostale provere, Naziv

            try
            {
                cvecare.Ime = Ime;
                cvecare.Grad = Grad;
                cvecare.BrojCveca = BrojCveca;
                kontekst.Cvecare.Update(cvecare);

                await kontekst.SaveChangesAsync();
                return Ok($"Promenjena je cvecara {Ime}!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        
        [Route("PromeniDostavljaca/{ID}/{Ime}")]
        [HttpPut]
        public async Task<ActionResult> PromeniDostavljaca(int ID, string Ime)
        {
            var dostavljaci = await kontekst.Dostavljaci.FindAsync(ID);

            if (dostavljaci == null || dostavljaci.ID <= 0)
            {
                return BadRequest("Ne postoji!");
            }

            if (Ime.Length > 20)
            {
                return BadRequest("Neprikladni argumenti");
            }


            // ... Ostale provere, Naziv

            try
            {
                dostavljaci.Ime = Ime;
                kontekst.Dostavljaci.Update(dostavljaci);

                await kontekst.SaveChangesAsync();
                return Ok($"Promenjen je dostavljac {Ime}!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("PromeniDostavu/{ID}/{IDCvecare}/{IDDostavljaca}/{BrojCveca}")]
        [HttpPut]
        public async Task<ActionResult> PromeniDostavu(int ID, int IDCvecare, int IDDostavljaca, int BrojCveca)
        {
           var dostava = await kontekst.Dostave.FindAsync(ID);

            if (dostava == null || dostava.ID <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            if (BrojCveca > 10000 || IDDostavljaca <= 0 || IDCvecare <= 0)
            {
                return BadRequest("Lose");
            }


            // ... Ostale provere, Naziv

            try
            {
                var cvecara = await kontekst.Cvecare.FindAsync(IDCvecare);
                var dostavljac = await kontekst.Dostavljaci.FindAsync(IDDostavljaca);
                dostava.Cvecare = cvecara;
                dostava.Dostavljaci = dostavljac;
                dostava.ID = ID;
                dostava.BrojCveca = BrojCveca;

                kontekst.Dostave.Update(dostava);

                await kontekst.SaveChangesAsync();
                return Ok($"Promenjena je dostava {BrojCveca}!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("PromeniKupovinu/{ID}/{BrojKupljenogCveca}/{ImeKupca}/{Datum}/{PotrosenNovac}/{CvecaraID}")]
        [HttpPut]
        public async Task<ActionResult> PromeniKupovinu(int ID, int BrojKupljenogCveca, string ImeKupca, DateTime Datum, double PotrosenNovac, int CvecaraID)
        {
            var kupovina = await kontekst.Kupovina.FindAsync(ID);
            var cvecara = await kontekst.Cvecare.FindAsync(CvecaraID);

            if (kupovina == null || kupovina.ID <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            if (ImeKupca.Length > 20 || PotrosenNovac > (double)10000000 || BrojKupljenogCveca > 10000 || cvecara == null || CvecaraID <= 0)
            {
                return BadRequest("Lose");
            }

            // ... Ostale provere, Naziv

            try
            {
            kupovina.BrojKupljenogCveca = BrojKupljenogCveca;
            kupovina.ImeKupca = ImeKupca;
            kupovina.Datum = Datum;
            kupovina.PotrosenNovac = PotrosenNovac;
            kupovina.Cvecare = cvecara;

                kontekst.Kupovina.Update(kupovina);

                await kontekst.SaveChangesAsync();
                return Ok($"Promenjena je kupovina {ImeKupca}!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("PromeniZaposlenog/{ID}/{IDCvecare}/{JMBG}/{Ime}/{Prezime}/{Grad}")]
        [HttpPut]
        public async Task<ActionResult> PromeniZaposlenog(int ID, int IDCvecare, string JMBG, string Ime, string Prezime, string Grad)
        {
            var zaposleni = await kontekst.Zaposleni.FindAsync(ID);

            if (zaposleni == null || zaposleni.ID <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            if (Ime.Length > 20 || Prezime.Length > 20 || JMBG.Length != 13 || Grad.Length > 20 || IDCvecare <= 0)
            {
                return BadRequest("Lose");
            }


            // ... Ostale provere, Naziv

            try
            {
                var cvecara = await kontekst.Cvecare.FindAsync(IDCvecare);
                zaposleni.Cvecare = cvecara;
                zaposleni.JMBG = JMBG;
                zaposleni.Ime = Ime;
                zaposleni.Prezime = Prezime;
                zaposleni.ID = ID;
                zaposleni.Grad = Grad;
                kontekst.Zaposleni.Update(zaposleni);

                await kontekst.SaveChangesAsync();
                return Ok($"Promenjen je zaposleni {JMBG}!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        #endregion
        #region DobijJedan
        [HttpGet]
        [Route("DobijCvecaru/{id}")]
        public async Task<ActionResult> GetCvecaru(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                var cvecara = await kontekst.Cvecare.Where(acc=>acc.ID==id).FirstOrDefaultAsync();
                return Ok(cvecara);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("DobijDostavljaca/{id}")]
        public async Task<ActionResult> GetDostavljacJedan(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                return Ok(await kontekst.Dostavljaci.FindAsync(id));
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);

                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("DobijDostavu/{id}")]
        public async Task<ActionResult> GetDostavu(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            try
            {
                return Ok(await kontekst.Dostave.Where(acc=>acc.ID==id).Select(p=>
                new{
                    BrojCveca = p.BrojCveca,
                    Cvecare = p.Cvecare,
                    Dostavljaci = p.Dostavljaci
                }).FirstOrDefaultAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("DobijKupovinu/{id}")]
        public async Task<ActionResult> GetKupovina(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            try
            {
                return Ok(await kontekst.Kupovina.Where(acc=>acc.ID==id).Select(p=>
                new{
                    ID = p.ID,
                    BrojKupljenogCveca = p.BrojKupljenogCveca,
                    ImeKupca = p.ImeKupca,
                    Datum = p.Datum,
                    PotrosenNovac = p.PotrosenNovac,
                    Cvecare = p.Cvecare
                }).FirstOrDefaultAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("DobijZaposlenog/{id}")]
        public async Task<ActionResult> GetZaposlenJedan(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            try
            {
                return Ok(await kontekst.Zaposleni.Where(acc=>acc.ID==id).Select(p=>
                new{
                    ID = p.ID,
                    JMBG = p.JMBG,
                    Ime = p.Ime,
                    Prezime = p.Prezime,
                    Grad = p.Grad,
                    Cvecare = p.Cvecare,
                }).FirstOrDefaultAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion
        #region Obrisi
        [Route("IzbrisiCvecaru/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisatiCvecaru(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                Cvecare cvecare = await kontekst.Cvecare.FindAsync(id);
             if (cvecare == null)
            {
                return BadRequest("Pogrešan ID!");
            }
                kontekst.Cvecare.Remove(cvecare);
                await kontekst.SaveChangesAsync();
                return Ok($"Izbrisana je cvecara!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiDostavljaca/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisatiDostavljaca(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                Dostavljaci dostavljac = await kontekst.Dostavljaci.FindAsync(id);
            if (dostavljac == null)
            {
                return BadRequest("Pogrešan ID!");
            }
                kontekst.Dostavljaci.Remove(dostavljac);
                await kontekst.SaveChangesAsync();
                return Ok($"Obrisan je dostavljac!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiDostavu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisatiDostavu(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                Dostave dostava = await kontekst.Dostave.FindAsync(id);
            if (dostava == null)
            {
                return BadRequest("Pogrešan ID!");
            }
                kontekst.Dostave.Remove(dostava);
                await kontekst.SaveChangesAsync();
                return Ok($"Obrisana je dostava!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiKupovinu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisatiKupovinu(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                Kupovina kupovina = await kontekst.Kupovina.FindAsync(id);
            if (kupovina == null)
            {
                return BadRequest("Pogrešan ID!");
            }
                kontekst.Kupovina.Remove(kupovina);
                await kontekst.SaveChangesAsync();
                return Ok($"Izbrisana je kupovina!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiZaposlenog/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisatiZaposlenog(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                var zaposleni = await kontekst.Zaposleni.FindAsync(id);
            if (zaposleni == null)
            {
                return BadRequest("Pogrešan ID!");
            }
                kontekst.Zaposleni.Remove(zaposleni);
                await kontekst.SaveChangesAsync();
                return Ok($"Izbrisani zaposleni!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
    #endregion
    }

}
