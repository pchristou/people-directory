import { AppState } from "../../../store/app.state";
import { AdminState } from "./reducers/admin.reducer";

// This interface represents the "Full" state only when the Admin module is loaded
export interface GlobalState extends AppState {
    admin: AdminState;
}
