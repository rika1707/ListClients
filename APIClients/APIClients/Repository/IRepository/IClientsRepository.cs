using APIClients.Entities;

namespace APIClients.Repository.IRepository
{
    public interface IClientsRepository
    {
        public Task<List<Clients>> GetAllClients();
        public Task<Clients?> GetClient(Guid clientId);
        public Task<bool> CreateClient(Clients client);
        public Task<bool> UpdateClient(Clients client);

        public Task<bool> DeleteClient(Guid clientId);
    }
}
