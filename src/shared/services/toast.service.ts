import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from "@shared/models/toast.model";

@Injectable({ providedIn: 'root' })
export class ToastService {
    // A private signal to hold our list of toasts
    private toastsSignal = signal<Toast[]>([]);

    // Public read-only version for components
    readonly toasts = this.toastsSignal.asReadonly();

    show(message: string, type: ToastType = 'success', autoClose = true) {
        const id = Date.now();
        const newToast: Toast = { id, message, type };

        this.toastsSignal.update(toasts => [newToast, ...toasts]);

        // Only set the timeout if autoClose is true
        if (autoClose) {
            setTimeout(() => this.remove(id), 5000); // Extended to 5s if auto-closing
        }
    }

    remove(id: number) {
        this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
    }
}
