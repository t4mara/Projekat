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
        [Route("DobijMenadzere")]
        public async Task<ActionResult> GetMenadzer()
        {
            try
            {
                return Ok(await kontekst.Menadzer.Select(p =>
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
            
            if (cvecare == null)
            {
                throw new ArgumentNullException(nameof(cvecare));
            }

            if (Ime.Length > 20 || Grad.Length > 20 || BrojCveca > 10000)
            {
                return BadRequest("Neprikladni argumenti");
            }

            try
            {
                kontekst.Cvecare.Add(cvecare);
                await kontekst.SaveChangesAsync();
                return Ok($"Cvecara je dodata! ID je {cvecare.ID} {cvecare.BrojCveca} {cvecare.Ime}");
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
                return Ok($"Dostava je dodata! ID je: {dostavljaci.ID}");
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

            if (brojCveca > 10000 || IDDostavljaca <= 0 || IDCvecare <= 0)
            {
                return BadRequest("Lose");
            }

                Dostave dostava = new Dostave
                {
                    Cvecare = cvecara,
                    Dostavljaci = dostavljac,
                    BrojCveca = brojCveca
                };

                kontekst.Dostave.Add(dostava);
                await kontekst.SaveChangesAsync();

                return Ok($"Dostava je dodata! ID je: {dostava.ID}");
            }
            catch (Exception e)
            {
            Console.WriteLine(e.InnerException.Message);
               return BadRequest(e.Message);
            }
         }
        [Route("DodajMenadzera/{JMBG}/{Ime}/{Prezime}/{Email}/{Broj}/{CvecaraID}")]
        [HttpPost]
        public async Task<ActionResult> DodajMenadzera (string JMBG, string Ime, string Prezime, string Email, string Broj, int CvecaraID){
            Menadzer menadzer = new Menadzer();
            menadzer.JMBG = JMBG;
            menadzer.Ime = Ime;
            menadzer.Prezime = Prezime;
            menadzer.Email = Email;
            menadzer.Broj = Broj;
            menadzer.CvecaraID = CvecaraID;

            if (Ime.Length > 20 || Email.Length > 20 || !(Email.Contains(".")) || !(Email.Contains("@")) || Prezime.Length > 20 || JMBG.Length != 13 || !(double.TryParse(JMBG, out _)) ||  Broj.Length != 10 || !(double.TryParse(Broj, out _)) || CvecaraID <= 0)
            {
                return BadRequest("Lose");
            }

            try
            {
                kontekst.Menadzer.Add(menadzer);
                await kontekst.SaveChangesAsync();
                return Ok($"Menadzer je dodat! ID je: {menadzer.JMBG}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                return BadRequest(e.Message);
            }
         }
        [Route("DodajZaposlenog/{IDCvecare}/{jmbg}/{ime}/{prezime}/{grad}")]
        [HttpPost]
        public async Task<ActionResult> DodajZaposlenog (int IDCvecare, string JMBG, string Ime, string Prezime, string Grad){
            try
            {
            if (Ime.Length > 20 || Prezime.Length > 20 || JMBG.Length != 13 || !(double.TryParse(JMBG, out _)) || Grad.Length > 20 || IDCvecare <= 0)
            {
                return BadRequest("Lose");
            }
                var cvecara = await kontekst.Cvecare.FindAsync(IDCvecare);
                Zaposleni zaposleni = new Zaposleni
                {
                    Cvecare = cvecara,
                    JMBG = JMBG,
                    Ime = Ime,
                    Prezime = Prezime,
                    Grad = Grad
                };

                kontekst.Zaposleni.Add(zaposleni);
                await kontekst.SaveChangesAsync();

                return Ok($"Dostava je dodata! ID je: {zaposleni.ID}");
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
                return Ok($"Uspešno izmenjen predmet! ID je: {cvecare.ID}");
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
                return Ok($"Uspešno izmenjen dostavljac! ID je: {dostavljaci.ID}");
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
                return Ok($"Uspešno izmenjen predmet! ID je: {dostava.ID}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("PromeniMenadzera/{ID}/{JMBG}/{Ime}/{Prezime}/{Email}/{Broj}/{CvecaraID}")]
        [HttpPut]
        public async Task<ActionResult> PromeniMenadzera(int ID, string JMBG, string Ime, string Prezime, string Email, string Broj, int CvecaraID)
        {
            var menadzer = await kontekst.Menadzer.FindAsync(ID);

            if (menadzer == null || menadzer.ID <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            if (Ime.Length > 20 || Prezime.Length > 20 || JMBG.Length != 13 || !(double.TryParse(JMBG, out _)) ||  Broj.Length != 10 || !(double.TryParse(Broj, out _)) || CvecaraID <= 0)
            {
                return BadRequest("Lose");
            }

            // ... Ostale provere, Naziv

            try
            {
                var cvecara = await kontekst.Cvecare.FindAsync(CvecaraID);
                menadzer.Cvecare = cvecara;
                menadzer.CvecaraID = CvecaraID;
                menadzer.JMBG = JMBG;
                menadzer.Ime = Ime;
                menadzer.Prezime = Prezime;
                menadzer.ID = ID;
                menadzer.Email = Email;
                menadzer.Broj = Broj;

                kontekst.Menadzer.Update(menadzer);

                await kontekst.SaveChangesAsync();
                return Ok($"Uspešno izmenjen predmet! ID je: {menadzer.JMBG}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("PromeniZaposlenog/{ID}/{IDCvecare}/{jmbg}/{ime}/{prezime}/{grad}")]
        [HttpPut]
        public async Task<ActionResult> PromeniZaposlenog(int ID, int IDCvecare, string JMBG, string Ime, string Prezime, string Grad)
        {
            var zaposleni = await kontekst.Zaposleni.FindAsync(ID);

            if (zaposleni == null || zaposleni.ID <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            if (Ime.Length > 20 || Prezime.Length > 20 || JMBG.Length != 13 || !(double.TryParse(JMBG, out _)) || Grad.Length > 20 || IDCvecare <= 0)
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
                return Ok($"Uspešno izmenjen predmet! ID je: {zaposleni.JMBG}");
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
                //return Ok(await kontekst.Cvecare.FindAsync(id));
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
        [Route("DobijMenadzera/{id}")]
        public async Task<ActionResult> GetMenadzera(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            try
            {
                return Ok(await kontekst.Menadzer.Where(acc=>acc.ID==id).Select(p=>
                new{
                    JMBG = p.JMBG,
                    Ime = p.Ime,
                    Prezime = p.Prezime,
                    Broj = p.Broj,
                    Email = p.Email,
                    Cvecare = p.Cvecare,
                    CvecaraID = p.CvecaraID
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
                var Cvecare = await kontekst.Cvecare.FindAsync(id);
             if (Cvecare == null)
            {
                return BadRequest("Pogrešan ID!");
            }
                kontekst.Cvecare.Remove(Cvecare);
                await kontekst.SaveChangesAsync();
                return Ok($"Uspešno izbrisana Cvecare: {Cvecare.Ime}");
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
                var dostavljac = await kontekst.Dostavljaci.FindAsync(id);
            if (dostavljac == null)
            {
                return BadRequest("Pogrešan ID!");
            }
                kontekst.Dostavljaci.Remove(dostavljac);
                await kontekst.SaveChangesAsync();
                return Ok($"Uspešno izbrisan dostavljac: {dostavljac.Ime}");
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
                var dostava = await kontekst.Dostave.FindAsync(id);
            if (dostava == null)
            {
                return BadRequest("Pogrešan ID!");
            }
                kontekst.Dostave.Remove(dostava);
                await kontekst.SaveChangesAsync();
                return Ok($"Uspešno izbrisana dostava: {dostava.ID}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message); 
                return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiMenadzera/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisatiMenadzera(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                var menadzer = await kontekst.Menadzer.FindAsync(id);
                             if (menadzer == null)
            {
                return BadRequest("Pogrešan ID!");
            }
                kontekst.Menadzer.Remove(menadzer);
                await kontekst.SaveChangesAsync();
                return Ok($"Uspešno izbrisan menadzer: {menadzer.Ime}");
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
                return Ok($"Uspešno izbrisan zaposleni: {zaposleni.Ime}");
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
