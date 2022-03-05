import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public todos: Array<{ title: string, description: string}> = [];

  constructor() { }

  load() {
    console.log('Loading data');
    this.todos.push({ title: 'Ärka üles', description: 'Enne kõike peame silmad lahti tegema' },
    { title: 'Pese silmad', description: 'Siis taastame nägemise' },
    { title: 'Pane riidesse', description: 'Seejärel paneme end mõislikusse vormi' },
    { title: 'Söö kõht täis', description: 'Ja valmistame end pikaks päevaks ette' },
    { title: 'Mine kooli', description: 'Edasi matkame pisut' },
    { title: 'Kuula hoolikalt loenguid', description: 'Ning kogume nii palju tarkusi kui võimalik' });
  }

  save(todo) {
    console.log('Saving data');
    
    // Kui leiame oma elementide hulgast samasuguse, siis muudame seda, vastasel juhul lisame
    const index = this.todos.indexOf(todo);

    if (index === -1) {
      this.todos.push(todo);
    } else {
      this.todos[index] = todo;
    }
  }

  get(id) {
    return this.todos.filter(x => x.title === id)[0];
  }
}
