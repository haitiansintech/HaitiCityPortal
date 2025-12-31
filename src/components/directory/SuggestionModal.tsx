"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { submitSuggestion } from "@/app/actions/submit-suggestion";
import { useToast } from "@/hooks/use-toast";

interface SuggestionModalProps {
    facility: {
        id: string;
        name: string;
        communal_section_id: string | null;
        contact_phone: string | null;
        whatsapp_number?: string | null;
    };
}

export function SuggestionModal({ facility }: SuggestionModalProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            try {
                await submitSuggestion(formData);
                setOpen(false);
                toast({
                    title: "Suggestion Received",
                    description: "Thank you! Your update has been sent to the local CASEC for verification.",
                });
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div role="button" className="text-xs text-center font-bold text-ink-secondary hover:text-brand-blue flex items-center justify-center gap-1 transition-colors cursor-pointer select-none">
                    <Info className="h-3 w-3" />
                    Is this information incorrect? Suggest an Edit
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-ink-primary">Suggest an Update</DialogTitle>
                    <DialogDescription>
                        Help us keep the directory accurate. Your suggestion will be verified by the local CASEC.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="space-y-4 py-4">
                    <input type="hidden" name="facilityId" value={facility.id} />
                    <input type="hidden" name="communalSectionId" value={facility.communal_section_id || ''} />

                    {/* Bot Honeypot */}
                    <input type="text" name="confirm_email" className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="space-y-2">
                        <Label htmlFor="userContact" className="font-bold">Your Verification Contact <span className="text-rose-500">*</span></Label>
                        <Input id="userContact" name="userContact" placeholder="Your Phone or Email" required className="rounded-xl" />
                        <p className="text-[10px] text-ink-secondary">Required to prevent spam. We will not share this.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name" className="font-bold">Facility Name</Label>
                        <Input id="name" name="name" defaultValue={facility.name} className="rounded-xl" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact_phone" className="font-bold">Phone Number</Label>
                            <Input id="contact_phone" name="contact_phone" defaultValue={facility.contact_phone || ''} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp_number" className="font-bold">WhatsApp</Label>
                            <Input id="whatsapp_number" name="whatsapp_number" defaultValue={facility.whatsapp_number || ''} className="rounded-xl" />
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="ghost" className="rounded-xl">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending} className="bg-brand-blue rounded-xl font-bold">
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit for Review
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
