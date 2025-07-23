using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BooksManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BooksManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Books : ControllerBase
    {
        private readonly BookContext _context;

        public Books(BookContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult> GetBookList(
    string? search = "",
    int page = 1,
    int pageSize = 10,
    string sortBy = "name",
    string sortOrder = "asc")
        {
            var query = _context.BookList.AsQueryable();

            // 🔍 Search
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(b =>
                    b.Name.Contains(search) ||
                    b.Author.Contains(search) ||
                    b.Description.Contains(search));
            }

            // 🔃 Sorting
            query = sortBy.ToLower() switch
            {
                "name" => sortOrder == "desc" ? query.OrderByDescending(b => b.Name) : query.OrderBy(b => b.Name),
                "author" => sortOrder == "desc" ? query.OrderByDescending(b => b.Author) : query.OrderBy(b => b.Author),
                _ => query.OrderBy(b => b.Name)
            };

            // 📊 Total before pagination
            var totalCount = await query.CountAsync();

            // 🧮 Pagination
            var books = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // ✅ Return with metadata
            return Ok(new
            {
                totalCount,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                data = books
            });
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookList>> GetBookList(int id)
        {
            var bookList = await _context.BookList.FindAsync(id);

            if (bookList == null)
            {
                return NotFound();
            }

            return bookList;
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookList(int id, BookList bookList)
        {
            if (id != bookList.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookList>> PostBookList(BookList bookList)
        { 
            Console.WriteLine($"Received book: {bookList.Name}, {bookList.Description}");

            // Validate that the incoming data is correct
            if (bookList.Name == null || bookList.Description == null || bookList.Author == null)
            {
                return BadRequest("Name, Author or Description is missing");
            }

            _context.BookList.Add(bookList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookList", new { id = bookList.Id }, bookList);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookList(int id)
        {
            var bookList = await _context.BookList.FindAsync(id);
            if (bookList == null)
            {
                return NotFound();
            }

            _context.BookList.Remove(bookList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookListExists(int id)
        {
            return _context.BookList.Any(e => e.Id == id);
        }
    }
}
