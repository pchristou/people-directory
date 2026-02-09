import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalState } from "../../store/admin.state";
import { Store } from "@ngrx/store";
import { AdminActions } from "../../store/actions/admin.actions";
import { TranslocoPipe } from "@jsverse/transloco";
import { APP_CONFIG } from "@shared/constants";

@Component({
    selector: 'app-new-user-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslocoPipe],
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
    userForm: FormGroup;

    constructor(private fb: FormBuilder, private store: Store<GlobalState>) {
        this.userForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            jobTitle: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern(APP_CONFIG.VALIDATION.PHONE)]],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    /**
     * On submission of the form
     */
    onSubmit(): void {
        if (this.userForm.valid) {
            this.store.dispatch(AdminActions.createUser({ user: this.userForm.value }));
        }
    }
}
