import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-alertas-varias',
  templateUrl: './alertas-varias.component.html',
  styleUrl: './alertas-varias.component.scss'
})
export class AlertasVariasComponent {
  messages2: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Otras inicializaciones si es necesario
  }

  error_small(text: string) {
    this.messages2 = [];
    this.messages2.push({ severity: 'error', summary: 'Error', detail: text });
    this.messageService.addAll(this.messages2);
  }
}
