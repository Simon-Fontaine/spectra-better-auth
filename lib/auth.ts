import { createClient } from "redis";
import { resend } from "./email/resend";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { admin, username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import prisma from "./database";

const redis = createClient({
  url: process.env.REDIS_URL,
});
await redis.connect();

export const auth = betterAuth({
  appName: "Spectra",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  rateLimit: {
    window: 60,
    max: 100,
    storage: "secondary-storage",
  },
  secondaryStorage: {
    get: async (key) => {
      const value = await redis.get(key);
      return value ? JSON.parse(value) : null;
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, JSON.stringify(value), { EX: ttl });
      else await redis.set(key, JSON.stringify(value));
    },
    delete: async (key) => {
      await redis.del(key);
      return null;
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const invite = await prisma.invite.findFirst({
            where: {
              email: user.email,
              expiresAt: {
                gte: new Date(),
              },
            },
          });

          if (!invite) {
            return false;
          }

          await prisma.invite.delete({
            where: {
              id: invite.id,
            },
          });
        },
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const result = await resend.emails.send({
        from: "Spectra <noreply@owspectra.com>",
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });

      console.log("email_verification", result, user.email);
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignInAfterVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const result = await resend.emails.send({
        from: "Spectra <noreply@owspectra.com>",
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });

      console.log("password_reset", result, user.email);
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        const result = await resend.emails.send({
          from: "Spectra <noreply@owspectra.com>",
          to: user.email,
          subject: "Delete your account",
          text: `Click the link to delete your account: ${url}`,
        });

        console.log("account_delete", result, user.email);
      },
    },
  },
  plugins: [username(), admin(), nextCookies()],
} as BetterAuthOptions);
