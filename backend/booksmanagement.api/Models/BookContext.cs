using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BooksManagement.Models
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options) : base(options)
        {

        }
        public DbSet<BookList> BookList { get; set; }
    }
}
