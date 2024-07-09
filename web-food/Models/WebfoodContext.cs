using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace web_food.Models;

public partial class WebfoodContext : DbContext
{
    public WebfoodContext()
    {
    }

    public WebfoodContext(DbContextOptions<WebfoodContext> options)
        : base(options)
    {
    }

    public virtual DbSet<History> Histories { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-IS3SVL7;Initial Catalog=webfood;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<History>(entity =>
        {
            entity.ToTable("history");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("id");
            entity.Property(e => e.Infouser)
                .HasColumnType("ntext")
                .HasColumnName("infouser");
            entity.Property(e => e.Price)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("price");
            entity.Property(e => e.Product)
                .HasColumnType("text")
                .HasColumnName("product");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("product");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("id");
            entity.Property(e => e.Img)
                .HasColumnType("text")
                .HasColumnName("img");
            entity.Property(e => e.Name)
                .HasColumnType("text")
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("price");
            entity.Property(e => e.Type)
                .HasColumnType("ntext")
                .HasColumnName("type");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
