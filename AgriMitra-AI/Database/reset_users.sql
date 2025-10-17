-- Create database if it doesn't exist
IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'AgriMitraAI')
BEGIN
    CREATE DATABASE [AgriMitraAI];
END
GO

USE [AgriMitraAI];
GO

-- Drop and recreate users table to ensure clean state
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    DROP TABLE [dbo].[users]
END
GO

CREATE TABLE [dbo].[users] (
    [id] INT IDENTITY(1,1) PRIMARY KEY,
    [name] NVARCHAR(100) NOT NULL,
    [email] NVARCHAR(100) NOT NULL UNIQUE,
    [password] NVARCHAR(255) NOT NULL,
    [role] NVARCHAR(20) NOT NULL DEFAULT 'User'
);
GO

-- Insert test user
INSERT INTO [dbo].[users] ([name], [email], [password], [role])
VALUES ('Test User', 'test@example.com', 'password123', 'User');
GO

-- Verify data
SELECT * FROM [dbo].[users];
GO