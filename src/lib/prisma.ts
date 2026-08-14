import { PrismaClient } from '@prisma/client';
import { encryptPersonalId, decryptPersonalId } from './crypto';

function createExtendedClient() {
  const baseClient = new PrismaClient();
  return baseClient.$extends({
    result: {
      user: {
        personalId: {
          needs: { personalIdEncrypted: true, personalIdIv: true, personalIdAuthTag: true },
          compute(user) {
            if (user.personalIdEncrypted && user.personalIdIv && user.personalIdAuthTag) {
              try {
                return decryptPersonalId(
                  user.personalIdEncrypted,
                  user.personalIdIv,
                  user.personalIdAuthTag
                );
              } catch (e) {
                console.error("Failed to decrypt personalId:", e);
                return null;
              }
            }
            return null;
          },
        },
      },
    },
    query: {
      user: {
        async create({ args, query }) {
          if (args.data && 'personalId' in args.data && typeof args.data.personalId === 'string') {
            const { personalId, ...rest } = args.data as any;
            const encrypted = encryptPersonalId(personalId);
            args.data = {
              ...rest,
              personalIdEncrypted: encrypted.encrypted,
              personalIdIv: encrypted.iv,
              personalIdAuthTag: encrypted.authTag,
            };
          }
          return query(args);
        },
        async update({ args, query }) {
          if (args.data && 'personalId' in args.data && typeof args.data.personalId === 'string') {
            const { personalId, ...rest } = args.data as any;
            const encrypted = encryptPersonalId(personalId);
            args.data = {
              ...rest,
              personalIdEncrypted: encrypted.encrypted,
              personalIdIv: encrypted.iv,
              personalIdAuthTag: encrypted.authTag,
            };
          } else if (args.data && 'personalId' in args.data && args.data.personalId === null) {
            const { personalId, ...rest } = args.data as any;
            args.data = {
              ...rest,
              personalIdEncrypted: null,
              personalIdIv: null,
              personalIdAuthTag: null,
            };
          }
          return query(args);
        },
        async upsert({ args, query }) {
          if (args.create && 'personalId' in args.create && typeof args.create.personalId === 'string') {
            const { personalId, ...rest } = args.create as any;
            const encrypted = encryptPersonalId(personalId);
            args.create = {
              ...rest,
              personalIdEncrypted: encrypted.encrypted,
              personalIdIv: encrypted.iv,
              personalIdAuthTag: encrypted.authTag,
            };
          }
          if (args.update && 'personalId' in args.update && typeof args.update.personalId === 'string') {
            const { personalId, ...rest } = args.update as any;
            const encrypted = encryptPersonalId(personalId);
            args.update = {
              ...rest,
              personalIdEncrypted: encrypted.encrypted,
              personalIdIv: encrypted.iv,
              personalIdAuthTag: encrypted.authTag,
            };
          }
          return query(args);
        },
        async updateMany({ args, query }) {
          if (args.data && 'personalId' in args.data && typeof args.data.personalId === 'string') {
            const { personalId, ...rest } = args.data as any;
            const encrypted = encryptPersonalId(personalId);
            args.data = {
              ...rest,
              personalIdEncrypted: encrypted.encrypted,
              personalIdIv: encrypted.iv,
              personalIdAuthTag: encrypted.authTag,
            };
          }
          return query(args);
        }
      }
    },
    client: {
      $withTenant<T>(this: any, tenantId: string, fn: (tx: any) => Promise<T>): Promise<T> {
        return this.$transaction(async (tx: any) => {
          await tx.$executeRawUnsafe(`SET LOCAL app.current_tenant_id = '${tenantId}';`);
          return fn(tx);
        });
      }
    }
  });
}

let prismaInstance: ReturnType<typeof createExtendedClient> | null = null;

function getPrismaClient() {
  if (!prismaInstance) {
    prismaInstance = createExtendedClient();
  }
  return prismaInstance;
}

export const prisma = new Proxy({} as any, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
}) as unknown as ReturnType<typeof createExtendedClient>;

export default prisma;
