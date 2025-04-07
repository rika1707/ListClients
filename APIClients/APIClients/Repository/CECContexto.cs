using APIClients.Entities;
using Microsoft.EntityFrameworkCore;

namespace OVEmpleadores.Persistencia.Repositorios
{
    public class ClientContext : DbContext
    {
        public ClientContext(DbContextOptions<ClientContext> opciones) : base(opciones)
        {
        }

        public DbSet<Clients> Clients { get; set; }
       
        }

    }


