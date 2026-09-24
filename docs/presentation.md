# Clean Architecture Backend

## Project Overview

A REST API built with Node.js, TypeScript, Express, MongoDB, MySQL, RabbitMQ, JWT, and Clean Architecture.

## Technology Stack

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- MySQL
- TypeORM
- RabbitMQ
- JWT
- Zod
- bcrypt

## Architecture

The project follows Clean Architecture with:

- Domain
- Application
- Infrastructure
- Presentation

### Request Flow

Client → Route → Middleware → Controller → Use Case → Repository → MongoDB

## Dual Database Synchronization

MongoDB is the primary database.

```text
MongoDB
   ↓
User Event
   ↓
RabbitMQ
   ↓
Consumer
   ↓
MySQL