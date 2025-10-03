"use client"
import {createPost} from "@/lib/actions/post.actions";
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod';

import * as  z from "zod"
import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/thread';
interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}
function PostThread({ userId }: { userId: string }) {
   
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation ),
        defaultValues: {
            thread: '',
            accountId: userId,
        }
        });
        const onSubmit= async(values:z.infer<typeof ThreadValidation>) =>{
            await createPost({
                text:values.thread,
                author:userId, 
                communityId:null,
                path:pathname

            });
            router.push("/")
        }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 flex flex-col justify-start gap-10"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border-dark-4 bg-dark-3 text-light-1">
                                <Textarea
                                    rows={15}
                                   
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Post Content</Button>
            </form>
        </Form>



    );
}
export default PostThread;