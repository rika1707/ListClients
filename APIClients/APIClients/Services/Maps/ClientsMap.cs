using APIClients.Entities;
using AutoMapper;

namespace APIClients.Services.Maps
{
    public class ClientsMap:Profile
    {
        public ClientsMap() 
        {
            CreateMap<ClientsDTOs, Clients>().ReverseMap();
        }
    }
}
