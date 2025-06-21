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
        public async Task<ActionResult<IEnumerable<BookList>>> GetBookList()
        {
            return await _context.BookList.ToListAsync();
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
            if (bookList.Name == null || bookList.Description == null)
            {
                return BadRequest("Name or Description is missing");
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
