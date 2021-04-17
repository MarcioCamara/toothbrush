import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentQuestion: number = 0;
  isShowingResult: boolean = false;
  isStarted: boolean = false;

  models: any = {};

  toothbrushColor: string = '';

  questions = [
    {
      title: 'Qual sua sobremesa favorita?',
      type: 'select',
      options: ['Pudim', 'Nutella', 'Bolo de Cenoura', 'Gelato de Abacaxi', 'Sendo doce...'],
    },
    {
      title: 'Qual a cor dos seus olhos?',
      type: 'select',
      options: ['Castanho Escuro', 'Castanho Claro', 'Verde', 'Azul', 'Depende...'],
    },
    {
      title: 'Qual sua idade?',
      type: 'select',
      options: ['12', '15', '26', '33', '100'],
    },
    {
      title: 'Você prefere cachorro ou gato?',
      type: 'select',
      options: ['Cachorro', 'Gato', 'Gato ', 'Cachorro ', 'Cachorro e Gato'],
    },
    {
      title: 'Qual seu sabor favorito de pasta de dente?',
      type: 'select',
      options: ['Menta ', 'Menta  ', 'Menta', 'Menta   ', 'Menta    '],
    },
    {
      title: 'Qual a cor da sua escova de dentes?',
      type: 'input',
      options: [],
    },
  ];

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  restartQuestions() {
    this.currentQuestion = 0;
    this.isShowingResult = false;
    this.isStarted = false;

    for (let i = 0; i < this.questions.length; i++) {
      this.models['value' + i] = undefined;
    }
  }

  showResult() {
    this.isShowingResult = true;
  }

  start() {
    this.isStarted = true;
  }
}
