using EmploymentAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmploymentAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fluent API конфігурація таблиці Users
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Username)
                      .IsRequired()
                      .HasMaxLength(30);

                entity.Property(e => e.Password)
                      .IsRequired()
                      .HasMaxLength(30);

                entity.Property(e => e.Email)
                      .IsRequired()
                      .HasMaxLength(50);
            });

            // Сідінг початкових даних
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", Password = "admin123", Email = "admin@example.com" },
                new User { Id = 2, Username = "user", Password = "user123", Email = "user@example.com" }
            );
        }
    }
}
