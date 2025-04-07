using APIClients.Entities;
using APIClients.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using OVEmpleadores.Persistencia.Repositorios;

namespace APIClients.Repository
{
    public class ClientsRepository: IClientsRepository
    {
        private readonly ClientContext _context;

        public ClientsRepository(ClientContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateClient(Clients client)
        {
            if (client == null) return false;
            await _context.Clients.AddAsync(client);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteClient(Guid clientId)
        {
            if (clientId == Guid.Empty) return false;

            var client = await _context.Clients.FindAsync(clientId);
            if (client == null) return false;

            client.IsDeleted = true;
            _context.Clients.Update(client);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Clients>> GetAllClients()
        {
            var listClients = await _context.Clients.Where(cl => cl.IsDeleted == false).ToListAsync();
            if (listClients == null) return new List<Clients>();
            return listClients;
        }

        public  async Task<Clients?> GetClient(Guid clientId)
        {
            return await _context.Clients.FirstOrDefaultAsync(cl => cl.Id == clientId);
        }

        public async Task<bool> UpdateClient(Clients client)
        {
            if (client == null || client.Id == Guid.Empty) return false;

            //We look for the user to edit or update
            var clientExist = await _context.Clients.FirstOrDefaultAsync(cl => cl.Id == client.Id);
            if (clientExist == null) return false;
            _context.Entry(clientExist).CurrentValues.SetValues(client);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
