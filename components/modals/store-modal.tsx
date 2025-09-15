"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, { message: "Numele trebuie să aibă cel puțin 3 caractere." }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    setLoading(true);

    const response=await axios.post("/api/stores", values);

    window.location.assign(`/${response.data.id}`);
  } catch (error) {
    toast.error("A apărut o eroare. Te rugăm să încerci din nou.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Modal
      title="Creează Magazin"
      description="Adaugă un nou magazin pentru a gestiona produse și categorii"
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
                  <FormLabel>Nume</FormLabel>
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
              <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                Anulează
              </Button>
              <Button disabled={loading} type="submit">
                Continuă
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
