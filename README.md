Kết nối cơ sở dữ liệu

B1: Tạo 1 cơ sở dữ liệu trống
B2: Tools -> NuGet Package Manager -> Console
B3: Scaffold-DbContext "Data Source= tên máy chủ cơ sở dữ liệu;Initial Catalog= tên sơ sở dữ liệu;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models (-force nếu cần)
B4: update-database // Migrations cơ sở dữ liệu

Package:
Microsoft.EntityFrameworkCore
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools

BE: 
MainController

FE:
Fetch API to BE