import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { users } from '~/server/db/schema';

// Get tomorrow's date at midnight UTC
const tomorrow = new Date();
tomorrow.setUTCHours(0, 0, 0, 0);
tomorrow.setDate(tomorrow.getDate() + 1);

export const userRouter = createTRPCRouter({
  updateDate: protectedProcedure
    .input(
      z.object({
        date: z.date().refine(
          (date) => {
            // Convert both dates to midnight UTC for comparison
            const dateToCheck = new Date(date);
            dateToCheck.setUTCHours(0, 0, 0, 0);
            return dateToCheck >= tomorrow;
          },
          {
            message: 'Date must be at least one day in the future',
          }
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(users)
        .set({
          selectedDate: input.date,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(users.id, ctx.session.user.id))
        .returning();

      if (!result.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      const selectedDate = result[0]?.selectedDate;
      return {
        selectedDate: selectedDate ? selectedDate.toISOString() : null,
      };
    }),

  getDate: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db
      .select({
        selectedDate: users.selectedDate,
      })
      .from(users)
      .where(eq(users.id, ctx.session.user.id))
      .limit(1);

    if (!user.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    const selectedDate = user[0]?.selectedDate;
    return selectedDate ? selectedDate.toISOString() : null;
  }),
});
