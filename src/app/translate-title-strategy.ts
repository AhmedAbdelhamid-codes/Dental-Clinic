import { Injectable, inject } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TranslateTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);

  private currentTitleKey = '';

  constructor() {
    super();

    this.translate.onLangChange.subscribe(() => {
      this.updateDocumentTitle();
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.currentTitleKey = this.buildTitle(snapshot) ?? '';
    this.updateDocumentTitle();
  }

  private updateDocumentTitle(): void {
    if (!this.currentTitleKey) return;

    this.translate.get(this.currentTitleKey).subscribe(translatedTitle => {
      this.title.setTitle(translatedTitle);
    });
  }
}