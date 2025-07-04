"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MotionWrapper } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Loader2, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendEmailAction } from "@/app/actions";
import { contactSchema } from "@/lib/schemas";
import * as React from 'react';

type FormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    const result = await sendEmailAction(data);
    
    if (result.success) {
      setStatus('success');
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } else {
      setStatus('error');
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error || "There was a problem with your request. Please try again.",
      });
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  const floatingLabelClasses = "absolute text-sm text-muted-foreground duration-300 transform -translate-y-2 scale-75 top-3 peer-focus:top-2 z-10 origin-[0] px-2 start-2.5 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2";

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <MotionWrapper>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Have a project in mind or just want to say hi? Feel free to send me a message.
          </p>
        </MotionWrapper>

        <MotionWrapper>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input id={field.name} placeholder=" " {...field} className="peer" />
                        </FormControl>
                        <Label htmlFor={field.name} className={floatingLabelClasses}>Your Name</Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                       <div className="relative">
                        <FormControl>
                          <Input id={field.name} placeholder=" " {...field} className="peer" />
                        </FormControl>
                        <Label htmlFor={field.name} className={floatingLabelClasses}>Your Email</Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Textarea id={field.name} placeholder=" " className="peer min-h-[150px] pt-5" {...field} />
                      </FormControl>
                      <Label htmlFor={field.name} className={floatingLabelClasses}>Tell me about your project...</Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" size="lg" disabled={status !== 'idle'}>
                  <AnimatePresence mode="wait" initial={false}>
                    {status === 'idle' && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                      >
                        Send Message
                      </motion.span>
                    )}
                    {status === 'loading' && (
                       <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                       >
                        <Loader2 className="h-6 w-6 animate-spin" />
                       </motion.div>
                    )}
                    {status === 'success' && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <Check className="h-6 w-6" />
                      </motion.div>
                    )}
                     {status === 'error' && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <AlertTriangle className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </form>
          </Form>
        </MotionWrapper>
      </div>
    </section>
  );
}
