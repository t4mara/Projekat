using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Text.Json.Serialization;

namespace Projekat
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<CvecaraKontekst>(options =>{
                options.UseSqlServer(Configuration.GetConnectionString("CvecareCS"));
            }
            );
            
            services.AddControllers();            

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Proba", Version = "v1" });
            });

            services.AddCors(options => 
            {
                options.AddPolicy("CORSAll", policy => 
                {
                        policy.WithOrigins(new string[]
                        {
                            "http://localhost:8080",
                            "https://localhost:8080",
                            "http://127.0.0.1:8080",
                            "https://127.0.0.1:8080",
                            "http://localhost:5500",
                            "https://localhost:5500",
                            "http://127.0.0.1:5500",
                            "https://127.0.0.1:5500"

                        }).AllowAnyHeader()
                        .AllowAnyMethod();
                });

                options.AddPolicy("CORSUser", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyOrigin().WithMethods("POST", "PUT", "GET");
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Proba v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CORSAll");

            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
