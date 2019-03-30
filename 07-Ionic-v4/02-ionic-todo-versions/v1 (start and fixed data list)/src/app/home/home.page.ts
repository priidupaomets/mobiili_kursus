import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    public todos: Array<{ title: string, description: string}> = [];

    constructor() {
      this.todos.push({ title: 'Ärka üles', description: 'Enne kõike peame silmad lahti tegema' },
      { title: 'Pese silmad', description: 'Siis taastame nägemise' },
      { title: 'Pane riidesse', description: 'Seejärel paneme end mõislikusse vormi' },
      { title: 'Söö kõht täis', description: 'Ja valmistame end pikaks päevaks ette' },
      { title: 'Mine kooli', description: 'Edasi matkame pisut' },
      { title: 'Kuula hoolikalt loenguid', description: 'Ning kogume nii palju tarkusi kui võimalik' });
    }
}
