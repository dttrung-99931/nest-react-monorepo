import { PrismaClient } from "./generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { config as loadEnv } from "dotenv";
import path from "node:path";

const packageRoot = path.resolve(__dirname, "..");

loadEnv({ path: path.join(packageRoot, ".env") });

/**
 * Resolve relative './' part in DATABASE_URL to
 * make sure it point to packages/database/prisma folder.
 *
 * './' will be changed based on running node process
 */
function resolveDatabaseUrl(url: string): string {
  const filePath = url.replace(/^file:/, "");
  if (path.isAbsolute(filePath)) return url;
  return `file:${path.join(packageRoot, filePath)}`;
}

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaBetterSqlite3({
    url: resolveDatabaseUrl(process.env.DATABASE_URL!),
  });
  const database = new PrismaClient({
    adapter: adapter,
  });
  return database;
}

// globalThis accessing to global object
// on browser -> window
// on node -> global
const globalThisPrima = globalThis as { prisma?: PrismaClient };

/**
 * Create database via proxy object that help database not created
 * when HMR (hot module replacement) in vite/next...
 * => database object not created => connection is kept
 */
export const database = new Proxy({} as PrismaClient, {
  // Custom get method for object
  // in js, obj.abc => under the hood, it call obj.get('abc')
  get(_, propOrFuncName) {
    let value;
    if (!globalThisPrima.prisma) {
      globalThisPrima.prisma = createPrismaClient();
    }
    value = (
      globalThisPrima.prisma as unknown as Record<string | symbol, unknown>
    )[propOrFuncName];
    if (typeof value === "function") {
      return value.bind(globalThisPrima.prisma);
    }
    return value;
  },
});
