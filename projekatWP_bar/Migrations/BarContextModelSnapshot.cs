﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using projekatWP_bar.Model;

namespace projekatWP_bar.Migrations
{
    [DbContext(typeof(BarContext))]
    partial class BarContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("projekatWP_bar.Model.Glass", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<string>("Color")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Color");

                    b.Property<string>("Name")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Name");

                    b.Property<int?>("OrderID")
                        .HasColumnType("int");

                    b.Property<int>("Position")
                        .HasColumnType("int")
                        .HasColumnName("Position");

                    b.Property<int>("Price")
                        .HasColumnType("int")
                        .HasColumnName("Price");

                    b.HasKey("ID");

                    b.HasIndex("OrderID");

                    b.ToTable("Glass");
                });

            modelBuilder.Entity("projekatWP_bar.Model.Order", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<int>("Num_glass")
                        .HasColumnType("int")
                        .HasColumnName("Num_glass");

                    b.Property<int>("Price")
                        .HasColumnType("int")
                        .HasColumnName("Price");

                    b.HasKey("ID");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("projekatWP_bar.Model.Glass", b =>
                {
                    b.HasOne("projekatWP_bar.Model.Order", "Order")
                        .WithMany("Glasses")
                        .HasForeignKey("OrderID");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("projekatWP_bar.Model.Order", b =>
                {
                    b.Navigation("Glasses");
                });
#pragma warning restore 612, 618
        }
    }
}
