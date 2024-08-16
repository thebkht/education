"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button";
import Form, {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import { toast } from "sonner";
import { Login, loginSchema } from "@/lib/types";
import styles from "./style.module.css";
import axios from "axios";
import { useRouter } from "next/router";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Index({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: Login) {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/login", values);
      if (res.status === 200) {
        toast.success("Siz tizim muvaffaqiyatli kirdingiz.");
      } else {
        toast.error("Xatolik yuz berdi.");
      }

      router.push("/");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Xatolik yuz berdi.");
      }
      setIsLoading(false);
    }
  }

  return (
    <div className={cn(className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.label}>Login</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Login"
                    className={styles.input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.label}>Parol</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Parol"
                    className={styles.input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="!mt-[45px] w-full"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? "Kirilmoqda" : "Kirish"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
