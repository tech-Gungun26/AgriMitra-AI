-- Create the database if it doesn't exist
IF NOT EXISTS (SELECT name FROM master.sys.databases WHERE name = N'AgriMitraAI')
BEGIN
    CREATE DATABASE AgriMitraAI;
END
GO

USE AgriMitraAI;
GO

-- Create users table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[users] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [name] NVARCHAR(100) NOT NULL,
        [email] NVARCHAR(100) NOT NULL UNIQUE,
        [password] NVARCHAR(255) NOT NULL,
        [role] NVARCHAR(20) NOT NULL DEFAULT 'User'
    );
END
GO

-- Add a test user if the table is empty
IF NOT EXISTS (SELECT 1 FROM [dbo].[users])
BEGIN
    INSERT INTO [dbo].[users] ([name], [email], [password], [role])
    VALUES ('Test User', 'test@example.com', 'password123', 'User');
END
GO

-- Print table structure and test data
SELECT 'Table Structure:' AS [Info];
SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'users';

SELECT 'Test Data:' AS [Info];
SELECT id, name, email, role FROM [dbo].[users];
GO