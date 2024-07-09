﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using web_food.Models;

#nullable disable

namespace web_food.Migrations
{
    [DbContext(typeof(WebfoodContext))]
    partial class WebfoodContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("web_food.Models.History", b =>
                {
                    b.Property<decimal>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("numeric(18, 0)")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<decimal>("Id"));

                    b.Property<string>("Infouser")
                        .IsRequired()
                        .HasColumnType("ntext")
                        .HasColumnName("infouser");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric(18, 0)")
                        .HasColumnName("price");

                    b.Property<string>("Product")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("product");

                    b.HasKey("Id");

                    b.ToTable("history", (string)null);
                });

            modelBuilder.Entity("web_food.Models.Product", b =>
                {
                    b.Property<decimal>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("numeric(18, 0)")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<decimal>("Id"));

                    b.Property<string>("Img")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("img");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric(18, 0)")
                        .HasColumnName("price");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("ntext")
                        .HasColumnName("type");

                    b.HasKey("Id");

                    b.ToTable("product", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
