"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form,
     FormField,
      FormItem,
       FormLabel,
        FormControl,
         FormMessage
         } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const { isSignedIn } = useAuth();

  const [loading, setloading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setloading(true);
      if (!isSignedIn) {
        toast.error("Te rugăm să te autentifici.");
        return;
      }

      const response = await axios.post("/api/stores", values);
      toast.success("Store creat cu succes.");
    } catch (error) {
      toast.error("Autentificare necesară sau altă eroare. Verifică sesiunea.");
    } finally {
      setloading(false);
    }
  }
        

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                    disabled={loading}
                     placeholder="E-Commerce" 
                     {...field} 
                     />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end">
            <Button 
            disabled={loading}
            variant="outline" type="button"
            onClick={storeModal.onClose}>
             Cancel
            </Button>
            <Button disabled={loading} type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
