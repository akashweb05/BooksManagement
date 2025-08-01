﻿using System.ComponentModel.DataAnnotations;

namespace BooksManagement.Models
{
    public class BookList
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
