import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoLoaderService } from '@shared/services/transloco-loader.service';
import { provideTransloco } from '@jsverse/transloco';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [
      provideBrowserGlobalErrorListeners(),
      provideRouter(routes),
      provideStore({}),
      provideEffects([]),
      provideStoreDevtools({
          maxAge: 25,
          logOnly: !isDevMode()
      }),
      provideHttpClient(),
      provideTransloco({
        config: {
            availableLangs: ['en', 'fr'],
            defaultLang: 'en',
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
        },
        loader: TranslocoLoaderService
    }),]
};
