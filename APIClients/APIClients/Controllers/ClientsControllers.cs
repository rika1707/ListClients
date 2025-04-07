using APIClients.Entities;
using APIClients.Services;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace APIClients.Controllers
{

    [ApiController]
    [SwaggerTag("Services related to customer administration")]
    [Route("api/clients")]
    public class ClientsController : ControllerBase
    {
        private readonly ClientsService _clientsService;
        private readonly ExcelService _excelService;

        public ClientsController(ClientsService clientsService, ExcelService excelService)
        {
            _clientsService = clientsService;
            _excelService = excelService;
        }

        // ✅ Get all clients
        [HttpGet]
        [SwaggerOperation(summary: "Get all clients")]
        public async Task<ActionResult<List<Clients>>> GetAllClients()
        {
            var clients = await _clientsService.GetAllClients();
            return Ok(clients);
        }

        // ✅ Get Clients by Id
        [HttpGet("{id}")]
        [SwaggerOperation(summary: "Get clients by Id")]
        public async Task<ActionResult<Clients>> GetClientsById(Guid id)
        {
            var client = await _clientsService.getClientsById(id);
            if (client == null)
            {
                return NotFound(new { message = "Client not found." });
            }
            return Ok(client);
        }

        // ✅ Create client
        [HttpPost]
        [SwaggerOperation(summary: "create Client")]
        public async Task<ActionResult<bool>> CreateClient([FromBody] ClientsDTOs clientsDTOs)
        {
            var result = await _clientsService.createClients(clientsDTOs);
            if (!result)
            {
                return BadRequest(new { message = "Client could not be created." });
            }

            return Ok(new { message = "Client created succefully." });
        }

        // ✅ Update Client
        [HttpPut("{id}")]
        [SwaggerOperation(summary: "Update Client")]
        public async Task<ActionResult<bool>> UpdateClient(Guid id, [FromBody] Clients client)
        {
            if (id != client.Id)
            {
                return BadRequest(new { message = "The client ID does not match." });
            }

            var result = await _clientsService.updateClients(client);
            if (!result)
            {
                return BadRequest(new { message = "Client could not be updated." });
            }

            return Ok(new { message = "Client updated succefully." });
        }

        // ✅ Logical user erase
        [HttpDelete("{id}")]
        [SwaggerOperation(summary: "Logical user erase")]
        public async Task<ActionResult<bool>> DeletedClient(Guid id)
        {
            var result = await _clientsService.deleteClients(id);
            if (!result)
            {
                return BadRequest(new { message = "Client could not be deleted." });
                }

            return Ok(new { message = "Client deleted succefully." });
        }

        [HttpGet("download-excel")]
        [SwaggerOperation(Summary = "Download excel of clients")]
        public async Task<ActionResult> DownloadExcelClients()
        {
            var stream =  await _excelService.GenerateExcel();
            return File(stream,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "RegisterClients.xlsx");
        }
    }
}
