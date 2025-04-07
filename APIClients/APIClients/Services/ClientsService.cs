

using APIClients.Entities;
using APIClients.Repository.IRepository;
using AutoMapper;

namespace APIClients.Services
{
    public class ClientsService
    {
        private readonly IClientsRepository _clientRepository;
        private readonly IMapper _mapper;
        public ClientsService(IClientsRepository clientRepository, IMapper mapper)
        {
            _clientRepository = clientRepository;
            _mapper = mapper;
        }

        public async Task<List<Clients>> GetAllClients()
        {
            return await _clientRepository.GetAllClients();

        }

        public async Task<Clients?> getClientsById(Guid Id)
        {
            return await _clientRepository.GetClient(Id);

        }

        public async Task<bool> createClients(ClientsDTOs clientDTOs)
        {
            var client = _mapper.Map<Clients>(clientDTOs);
            return await _clientRepository.CreateClient(client);
        }

        public async Task<bool> updateClients(Clients clients)
        {
            return await _clientRepository.UpdateClient(clients);
        }

        public async Task<bool> deleteClients(Guid Id)
        {
            return await _clientRepository.DeleteClient(Id);
        }
    }
}
