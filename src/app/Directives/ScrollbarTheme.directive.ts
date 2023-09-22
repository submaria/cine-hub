/* eslint-disable max-len */
import { Directive, ElementRef, NgModule } from '@angular/core';

@Directive({
  selector: '[appScrollbarTheme]'
})
export class ScrollbarThemeDirective {
  constructor(private el: ElementRef) {
    const stylesheet = `
      ::-webkit-scrollbar {
        width: 5px;
      }
      ::-webkit-scrollbar-track {
        background: #adb5bd5d;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #000000;
        border-radius: 20px;
        border: 3px black;
      }
      ::-webkit-scrollbar-thumb:hover {
      }
    `;

    const styleElmt = el.nativeElement.shadowRoot;

    if(styleElmt !== undefined){
      const selectorStyle = styleElmt.querySelector('style');

      if (selectorStyle) {
        selectorStyle.append(stylesheet);
      } else {
        const barStyle = document.createElement('style');
        barStyle.append(stylesheet);
        styleElmt.appendChild(barStyle);
      };
    };
  };

  scollBarIonicSelectable() {
    const stylesheet = `
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: #adb5bd5d;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #000000;
        border-radius: 20px;
        border: 3px black;
      }
      ::-webkit-scrollbar-thumb:hover {
      }
    `;

    setTimeout(() => {
      const styleElmt = document.getElementsByTagName('ionic-selectable-modal');

      if(styleElmt !== null){
        const selectorStyle = styleElmt[0].attributes[0].ownerElement
        .children[1].shadowRoot.querySelector('style');

        if (selectorStyle) {
          selectorStyle.append(stylesheet);
        } else {
          const barStyle = document.createElement('style');
          barStyle.append(stylesheet);

          styleElmt[0].attributes[0].ownerElement
          .children[1].shadowRoot.appendChild(barStyle);
        };
      }
    }, 50);
  }
}

@NgModule({
  declarations: [ ScrollbarThemeDirective ],
  exports: [ ScrollbarThemeDirective ]
})
export class ScrollbarThemeModule {}
