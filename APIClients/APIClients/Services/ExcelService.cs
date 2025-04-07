using ClosedXML.Excel;

namespace APIClients.Services
{
    public class ExcelService
    {
        private readonly ClientsService _clientService;
        public ExcelService(ClientsService clientService)
        {
            _clientService = clientService;
        }
        public async Task<byte[]> GenerateExcel()
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Clients");

            var listClients = await _clientService.GetAllClients();

            // Headers
            worksheet.Cell(1, 1).Value = "Name";
            worksheet.Cell(1, 2).Value = "Direction";
            worksheet.Cell(1, 3).Value = "PhoneNumber";
            worksheet.Cell(1, 4).Value = "Latitude";
            worksheet.Cell(1, 5).Value = "Longitude";

            // Data
            var index = 2;
            foreach (var client in listClients)
            {

                worksheet.Cell(index, 1).Value = client.Name;
                worksheet.Cell(index, 2).Value = client.Direction;
                worksheet.Cell(index, 3).Value = client.PhoneNumber;
                worksheet.Cell(index, 4).Value = client.Latitude;
                worksheet.Cell(index, 5).Value = client.Longitude;

                index += 1;
            }

            // Estilo opcional
            var headerRange = worksheet.Range("A1:E1");
            headerRange.Style.Font.Bold = true;
            headerRange.Style.Fill.BackgroundColor = XLColor.LightGray;

            worksheet.Columns().AdjustToContents(); // Autoajustar ancho de columnas

            // Guardar en memoria
            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            stream.Position = 0;

            return stream.ToArray();
        }
    }
}
