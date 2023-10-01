# Accounting Book.

## Getting Started

```sh
# Initiation the prisma dependents.
npm install
```

```sh
# Should be started the once times.
npm run prisma:migrate:dev
```

```sh
# Start application as development
npm run dev
```

```sh
# Start application as production
npm run build
```

```sh
# Start application as package
npm run package
```

## Learn Documentation

- [Next.js](https://nextjs.org/) project bootstrapped with
- [Next.js documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Next.js deployment documentation](https://nextjs.org/docs/deployment)
- [Electron](https://www.electronjs.org/)
- [Electron documentation](https://www.electronjs.org/docs/latest/)
- [Prisma](https://www.prisma.io/)
- [Prisma documentation](https://www.prisma.io/docs/concepts/overview/what-is-prisma)
- [esbuild documentation](https://esbuild.github.io/)

### Work with Database

[Prisma migrate](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate)

```sh
# If you want to update the database and keep the changes in your migration history
npm run prisma:migrate:dev
```

```sh
# You can also reset the database yourself to undo manual changes
npm run prisma:migrate:reset
```

```sh
# In production and testing environments, use the command
npm run prisma:migrate:deploy
```

[Prisma db](https://www.prisma.io/docs/reference/api-reference/command-reference#db)

```sh
# If you just want to update the database without creating a migration
npm run prisma:db:push
```

```sh
# The db pull command connects to your database and adds Prisma models to your Prisma schema that reflect the current database schema
npm run prisma:db:pull
```

```sh
#
npm run prisma:db:seed
```
