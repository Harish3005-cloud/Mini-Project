import * as z from 'zod';

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(1000),
});

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters" }),
});
