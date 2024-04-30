using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace StudyBuddy.Models
{
    public partial class StudyBuddyDBContext : DbContext
    {
        public StudyBuddyDBContext()
        {
        }

        public StudyBuddyDBContext(DbContextOptions<StudyBuddyDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Favorite> Favorites { get; set; } = null!;
        public virtual DbSet<QuestionsAndAnswer> QuestionsAndAnswers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer(Secret.opBuild);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Favorite>(entity =>
            {
                entity.Property(e => e.FavoriteId).HasColumnName("FavoriteID");

                entity.Property(e => e.AnswerId).HasColumnName("AnswerID");

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.UserId)
                    .HasMaxLength(3000)
                    .HasColumnName("UserID");

                entity.HasOne(d => d.Answer)
                    .WithMany(p => p.FavoriteAnswers)
                    .HasForeignKey(d => d.AnswerId)
                    .HasConstraintName("FK__Favorites__Answe__619B8048");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.FavoriteQuestions)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK__Favorites__Quest__60A75C0F");
            });

            modelBuilder.Entity<QuestionsAndAnswer>(entity =>
            {
                entity.HasKey(e => e.QuestionId)
                    .HasName("PK__Question__0DC06F8CAF7336CD");

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.Answers).HasMaxLength(3000);

                entity.Property(e => e.Questions).HasMaxLength(3000);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
